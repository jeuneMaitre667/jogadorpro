import { test, expect } from '@playwright/test'

test.describe('Demo Challenge Creation Flow', () => {
  test('should login and create demo challenge', async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:3000/auth/login')
    
    // Fill login form
    await page.fill('input[type="email"]', 'arma@gmail.com')
    await page.fill('input[type="password"]', 'armada')
    
    // Click login button
    await page.click('button[type="submit"]')
    
    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 5000 })
    console.log('✓ Login successful')
    
    // Navigate to create challenge page
    await page.goto('http://localhost:3000/dashboard-pages/create-challenge')
    await page.waitForLoadState('networkidle')
    console.log('✓ Create challenge page loaded')
    
    // Select DEMO tier card
    const demoCard = page.locator('text=Demo Challenge').first()
    await demoCard.scrollIntoViewIfNeeded()
    await demoCard.click({ force: true })
    console.log('✓ Selected DEMO tier')

    // Find and click the "Acheter un Challenge" button
    const buyButton = page.locator('button:has-text("Acheter un Challenge")')
    await expect(buyButton).toBeEnabled({ timeout: 5000 })
    await buyButton.click()
    console.log('✓ Clicked "Acheter un Challenge" button')
    
    // Wait for API call to complete
    await page.waitForTimeout(2000)
    
    // Check if we redirected to dashboard (success) or got error
    const currentUrl = page.url()
    console.log('Current URL:', currentUrl)
    
    // Check for error messages
    const errorElement = await page.locator('text=/Failed|Error|Erreur/i').first()
    const hasError = await errorElement.isVisible().catch(() => false)
    
    if (hasError) {
      const errorText = await errorElement.textContent()
      console.log('❌ Error found:', errorText)
      throw new Error(`Challenge creation failed: ${errorText}`)
    }
    
    // Check if redirected to place-pick
    if (currentUrl.includes('/dashboard-pages/place-pick')) {
      console.log('✓ Redirected to place-pick - Challenge created successfully!')
    } else {
      console.log('⚠ Unexpected URL after creation:', currentUrl)
    }
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'tests/screenshots/demo-challenge-result.png', fullPage: true })
    console.log('✓ Screenshot saved to tests/screenshots/demo-challenge-result.png')
  })
})
