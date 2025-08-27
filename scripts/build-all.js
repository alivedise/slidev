const fs = require('fs-extra')
const { execSync } = require('child_process')
const path = require('path')

async function buildAllPresentations() {
  const presentationsDir = path.join(__dirname, '..', 'presentations')
  const distDir = path.join(__dirname, '..', 'dist')
  
  // Clean and create dist directory
  await fs.remove(distDir)
  await fs.ensureDir(distDir)
  
  // Get all presentation directories
  const presentations = await fs.readdir(presentationsDir)
  const validPresentations = []
  
  for (const presentation of presentations) {
    const presentationPath = path.join(presentationsDir, presentation)
    const slidesPath = path.join(presentationPath, 'slides.md')
    
    if (await fs.pathExists(slidesPath)) {
      validPresentations.push(presentation)
      console.log(`Building presentation: ${presentation}`)
      
      // Build the presentation
      const buildCommand = `cd "${presentationPath}" && npx slidev build --base /slidev/${presentation}/ --out ../../dist/${presentation}`
      execSync(buildCommand, { stdio: 'inherit' })
      
      console.log(`✅ Built: ${presentation}`)
    }
  }
  
  // Create index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slidev Presentations</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
        }
        h1 {
            color: #2d3748;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 0.5rem;
        }
        .presentation {
            display: block;
            padding: 1rem;
            margin: 1rem 0;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            text-decoration: none;
            color: #2d3748;
            transition: all 0.2s;
        }
        .presentation:hover {
            border-color: #3182ce;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }
        .presentation-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .presentation-path {
            font-size: 0.875rem;
            color: #718096;
            font-family: 'SF Mono', Monaco, monospace;
        }
        .footer {
            margin-top: 3rem;
            padding-top: 1rem;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            color: #718096;
            font-size: 0.875rem;
        }
    </style>
</head>
<body>
    <h1>📊 Slidev Presentations</h1>
    <p>Welcome to the collection of Slidev presentations. Click on any presentation below to view it:</p>
    
    ${validPresentations.map(presentation => `
    <a href="./${presentation}/" class="presentation">
        <div class="presentation-title">${presentation.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
        <div class="presentation-path">/${presentation}/</div>
    </a>
    `).join('')}
    
    <div class="footer">
        <p>Built with <a href="https://sli.dev" target="_blank">Slidev</a> and deployed via GitHub Actions</p>
    </div>
</body>
</html>`
  
  await fs.writeFile(path.join(distDir, 'index.html'), indexHtml)
  
  console.log(`\n✅ Build completed! Generated ${validPresentations.length} presentations:`)
  validPresentations.forEach(p => console.log(`   - ${p}`))
  console.log(`\n📁 Output directory: dist/`)
  console.log(`🌐 Index page: dist/index.html`)
}

buildAllPresentations().catch(console.error)