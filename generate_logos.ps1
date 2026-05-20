Add-Type -AssemblyName System.Drawing
try {
    $srcPath = "C:\Users\cmedi\Documents\Antigravity\reservaspinningusm\reservaspinningusm\pureendurence.jpeg"
    $dest192 = "C:\Users\cmedi\Documents\Antigravity\reservaspinningusm\reservaspinningusm\icon-192.png"
    $dest512 = "C:\Users\cmedi\Documents\Antigravity\reservaspinningusm\reservaspinningusm\icon-512.png"
    
    function GenerateCleanIcon($size, $destPath) {
        $bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
        $w = $bmp.Width
        $h = $bmp.Height
        
        $canvas = New-Object System.Drawing.Bitmap -ArgumentList $size, $size
        $g = [System.Drawing.Graphics]::FromImage($canvas)
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        
        # Clear canvas to solid black
        $g.Clear([System.Drawing.Color]::Black)
        
        # Scale = 70%
        $scale = 0.70
        $targetH = $size * $scale
        $targetW = $w * ($targetH / $h)
        $tx = ($size - $targetW) / 2
        $ty = ($size - $targetH) / 2
        
        # Draw scaled image
        $g.DrawImage($bmp, $tx, $ty, $targetW, $targetH)
        
        # Draw linear horizontal gradients on left and right to fade carbon texture vertical edges to black
        # The fade width is scaled proportionally to the icon size (about 8% of the icon size)
        $fadeWidth = [Math]::Max(5, [int]($size * 0.08))
        
        # Left fade brush: from tx to tx + fadeWidth
        $leftRect = New-Object System.Drawing.RectangleF -ArgumentList $tx, $ty, $fadeWidth, $targetH
        $leftBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush -ArgumentList $leftRect, ([System.Drawing.Color]::Black), ([System.Drawing.Color]::FromArgb(0, 0, 0, 0)), ([System.Drawing.Drawing2D.LinearGradientMode]::Horizontal)
        $g.FillRectangle($leftBrush, $leftRect)
        $leftBrush.Dispose()
        
        # Right fade brush: from tx + targetW - fadeWidth to tx + targetW
        $rightRect = New-Object System.Drawing.RectangleF -ArgumentList ($tx + $targetW - $fadeWidth), $ty, $fadeWidth, $targetH
        $rightBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush -ArgumentList $rightRect, ([System.Drawing.Color]::FromArgb(0, 0, 0, 0)), ([System.Drawing.Color]::Black), ([System.Drawing.Drawing2D.LinearGradientMode]::Horizontal)
        $g.FillRectangle($rightBrush, $rightRect)
        $rightBrush.Dispose()
        
        $g.Dispose()
        $canvas.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $canvas.Dispose()
        $bmp.Dispose()
        
        Write-Host "Generated $size x $size icon at $destPath"
    }
    
    GenerateCleanIcon 192 $dest192
    GenerateCleanIcon 512 $dest512
    
    Write-Host "Success! Both icons generated successfully with no text clipping and smooth vertical edges."
} catch {
    Write-Host "Error: $_"
}
