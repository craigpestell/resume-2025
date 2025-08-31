// Script to test font loading optimization
console.log('=== Font Loading Test ===');

// Check what font links are loaded initially
const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis"]');
console.log(`Initial Google Font links loaded: ${fontLinks.length}`);
fontLinks.forEach(link => {
  console.log(`- ${link.href}`);
});

// Check CSS variables
const root = document.documentElement;
const computedStyle = getComputedStyle(root);
const fontVars = [
  '--font-inconsolata',
  '--font-inter', 
  '--font-roboto',
  '--font-opensans'
];

console.log('\n=== CSS Font Variables ===');
fontVars.forEach(varName => {
  const value = computedStyle.getPropertyValue(varName);
  console.log(`${varName}: ${value || 'not set'}`);
});

// Test dynamic font loading
console.log('\n=== Testing Dynamic Font Loading ===');
if (window.loadGoogleFont) {
  window.loadGoogleFont('inter').then(() => {
    console.log('Successfully loaded Inter font');
    const newValue = computedStyle.getPropertyValue('--font-inter');
    console.log(`--font-inter after loading: ${newValue}`);
  }).catch(err => {
    console.error('Failed to load Inter font:', err);
  });
}
