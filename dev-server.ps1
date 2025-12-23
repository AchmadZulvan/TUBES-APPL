param(
    [int]$Port = 5500,
    [string]$Root = $PSScriptRoot
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$rootFull = [System.IO.Path]::GetFullPath($Root)

function Get-ContentType([string]$path) {
    switch -Regex ([System.IO.Path]::GetExtension($path).ToLowerInvariant()) {
        '\.html?$' { return 'text/html; charset=utf-8' }
        '\.css$'   { return 'text/css; charset=utf-8' }
        '\.js$'    { return 'application/javascript; charset=utf-8' }
        '\.json$'  { return 'application/json; charset=utf-8' }
        '\.png$'   { return 'image/png' }
        '\.jpe?g$' { return 'image/jpeg' }
        '\.gif$'   { return 'image/gif' }
        '\.svg$'   { return 'image/svg+xml' }
        '\.ico$'   { return 'image/x-icon' }
        '\.webp$'  { return 'image/webp' }
        '\.woff2$' { return 'font/woff2' }
        '\.woff$'  { return 'font/woff' }
        '\.ttf$'   { return 'font/ttf' }
        default     { return 'application/octet-stream' }
    }
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")

try {
    $listener.Start()
    Write-Host "Serving '$rootFull' at http://localhost:$Port/" -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop." -ForegroundColor DarkGray

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $req = $context.Request
            $res = $context.Response

            if ($req.HttpMethod -ne 'GET' -and $req.HttpMethod -ne 'HEAD') {
                $res.StatusCode = 405
                $res.Close()
                continue
            }

            $absPath = $req.Url.AbsolutePath
            if (-not $absPath) { $absPath = '/' }
            $rel = [Uri]::UnescapeDataString($absPath.TrimStart('/'))
            if ([string]::IsNullOrWhiteSpace($rel)) { $rel = 'index.html' }
            if ($rel.EndsWith('/')) { $rel += 'index.html' }

            $candidate = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($rootFull, $rel))

            # Prevent directory traversal
            if (-not $candidate.StartsWith($rootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
                $res.StatusCode = 403
                $res.Close()
                continue
            }

            if (-not (Test-Path -LiteralPath $candidate -PathType Leaf)) {
                $res.StatusCode = 404
                $bytes404 = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
                $res.ContentType = 'text/plain; charset=utf-8'
                $res.Headers['Cache-Control'] = 'no-store'
                if ($req.HttpMethod -ne 'HEAD') {
                    $res.OutputStream.Write($bytes404, 0, $bytes404.Length)
                }
                $res.Close()
                continue
            }

            $res.StatusCode = 200
            $res.ContentType = Get-ContentType $candidate
            $res.Headers['Cache-Control'] = 'no-store'

            # Helpful for SW testing on localhost
            if ($candidate.EndsWith('sw.js', [System.StringComparison]::OrdinalIgnoreCase)) {
                $res.Headers['Service-Worker-Allowed'] = '/'
            }

            if ($req.HttpMethod -ne 'HEAD') {
                $bytes = [System.IO.File]::ReadAllBytes($candidate)
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
            }

            $res.Close()
        } catch {
            try {
                $context.Response.StatusCode = 500
                $context.Response.ContentType = 'text/plain; charset=utf-8'
                $context.Response.Headers['Cache-Control'] = 'no-store'
                $msg = [System.Text.Encoding]::UTF8.GetBytes("500 Internal Server Error\n$($_.Exception.Message)")
                $context.Response.OutputStream.Write($msg, 0, $msg.Length)
                $context.Response.Close()
            } catch {
                # ignore
            }
        }
    }
} finally {
    if ($listener.IsListening) { $listener.Stop() }
    $listener.Close()
}
