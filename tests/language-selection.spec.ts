import { test, expect } from '@playwright/test'

test.describe('Language Selection', () => {
  test('should change language when selecting different options', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/auth/login')
    await page.fill('input[type="email"]', 'arma@gmail.com')
    await page.fill('input[type="password"]', 'armada')
    await page.click('button:has-text("Se connecter")')
    
    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard-pages/dashboard')
    await page.waitForTimeout(1000)
    
    console.log('✅ Login successful')
    
    // Click Settings button (gear icon)
    const settingsButtons = await page.locator('button[title="Paramètres"]')
    await settingsButtons.click()
    
    // Wait for settings page to load
    await page.waitForURL('**/dashboard-pages/settings')
    await page.waitForTimeout(1000)
    
    console.log('✅ Settings page opened')
    
    // Click on Langue tab
    const langTab = page.locator('button').filter({ hasText: 'Langue' }).first()
    await langTab.click()
    
    await page.waitForTimeout(500)
    console.log('✅ Language tab opened')
    
    // Verify initial language is French
    const frenchRadio = page.locator('input[name="language"][value="fr"]')
    expect(await frenchRadio.isChecked()).toBeTruthy()
    console.log('✅ French (FR) is initially selected')
    
    // Select English
    const englishRadio = page.locator('input[name="language"][value="en"]')
    await englishRadio.click()
    
    // Wait for page reload
    await page.waitForURL('**/dashboard-pages/settings', { timeout: 10000 })
    await page.waitForTimeout(1500)
    
    console.log('✅ English (EN) selected and page reloaded')
    
    // Verify localStorage contains the new language
    const language = await page.evaluate(() => localStorage.getItem('language'))
    expect(language).toBe('en')
    console.log('✅ localStorage updated with language: en')
    
    // Verify HTML lang attribute changed
    const htmlLang = await page.evaluate(() => document.documentElement.lang)
    expect(htmlLang).toBe('en')
    console.log('✅ HTML lang attribute set to: en')
    
    // Test Portuguese selection
    const langTab2 = page.locator('button').filter({ hasText: 'Langue' }).first()
    await langTab2.click()
    
    await page.waitForTimeout(300)
    
    const portugueseRadio = page.locator('input[name="language"][value="pt"]')
    await portugueseRadio.click()
    
    await page.waitForURL('**/dashboard-pages/settings', { timeout: 10000 })
    await page.waitForTimeout(1500)
    
    console.log('✅ Portuguese (PT) selected and page reloaded')
    
    const languagePt = await page.evaluate(() => localStorage.getItem('language'))
    expect(languagePt).toBe('pt')
    console.log('✅ localStorage updated with language: pt')
    
    const htmlLangPt = await page.evaluate(() => document.documentElement.lang)
    expect(htmlLangPt).toBe('pt')
    console.log('✅ HTML lang attribute set to: pt')
    
    // Return to French
    const langTab3 = page.locator('button').filter({ hasText: 'Langue' }).first()
    await langTab3.click()
    
    await page.waitForTimeout(300)
    
    const frenchRadioFinal = page.locator('input[name="language"][value="fr"]')
    await frenchRadioFinal.click()
    
    await page.waitForURL('**/dashboard-pages/settings', { timeout: 10000 })
    await page.waitForTimeout(1500)
    
    console.log('✅ Back to French (FR)')
    
    const languageFr = await page.evaluate(() => localStorage.getItem('language'))
    expect(languageFr).toBe('fr')
    console.log('✅ localStorage back to language: fr')
    
    const htmlLangFr = await page.evaluate(() => document.documentElement.lang)
    expect(htmlLangFr).toBe('fr')
    console.log('✅ HTML lang attribute back to: fr')
    
    console.log('\n✨ All language selection tests passed!')
  })
})
