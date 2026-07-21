# Create a minimal test resume file in temp folder
$pdfContent = @"
Priya Nair
priya@example.com | +91 98765 43210 | Bangalore, IN | github.com/priyanair
Senior ML Engineer -- 8 years experience
Education: M.S. Computer Science from IIT Bombay

Experience:
Lead ML Engineer at Arcturus AI (2021 - Present)
- Built distributed training pipelines using PyTorch, Kubernetes, and MLflow.
- Fine-tuned transformer LLM models and optimized inference with Triton.
- 8 years of experience in Python, PyTorch, TensorFlow, Docker, Kubernetes, MLOps.
"@

$tmpPdf = "$env:TEMP\test_resume.txt"
[System.IO.File]::WriteAllText($tmpPdf, $pdfContent)

Write-Host "=== Live screen test with PDF resume ===" -ForegroundColor Cyan
$result = & "C:\Windows\System32\curl.exe" -s -X POST http://localhost:3001/api/screen `
  -F "jobTitle=Senior ML Engineer" `
  -F "jobDescription=We need a Senior ML Engineer with Python PyTorch TensorFlow Kubernetes MLflow experience. Masters or PhD preferred. 5+ years experience in deep learning and model deployment." `
  -F "mustSkills=python,pytorch,kubernetes" `
  -F "resumes=@${tmpPdf};type=text/plain"

# Parse and display key fields
try {
    $json = $result | ConvertFrom-Json
    if ($json.error) {
        Write-Host "  ERROR: $($json.error)" -ForegroundColor Red
    } else {
        Write-Host "  Total candidates : $($json.total)" -ForegroundColor Green
        $c = $json.candidates[0]
        Write-Host "  Name             : $($c.name)"
        Write-Host "  Score            : $($c.score)/100"
        Write-Host "  Status           : $($c.status)"
        Write-Host "  Experience       : $($c.experience)"
        Write-Host "  Education        : $($c.education)"
        Write-Host "  Matched skills   : $(($c.matchedSkills) -join ', ')"
        Write-Host "  Missing skills   : $(($c.missingSkills) -join ', ')"
        Write-Host "  Summary          : $($c.summary)"
        Write-Host "  Breakdown        :"
        foreach ($b in $c.breakdown) { Write-Host "    $($b.label): $($b.pct)%" }
    }
} catch {
    Write-Host "  Parse error: $_" -ForegroundColor Red
    Write-Host "  Raw: $result"
}

Remove-Item $tmpPdf -ErrorAction SilentlyContinue
Write-Host ""
Write-Host "=== Test complete ===" -ForegroundColor Green
