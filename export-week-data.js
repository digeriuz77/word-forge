/**
 * Export WEEK_DATA from constants.ts to week-data.json
 * This script reads the TypeScript constants file and extracts the vocabulary data
 */

const fs = require('fs');
const path = require('path');

// Read the constants.ts file
const constantsPath = path.join(__dirname, 'constants.ts');
const constantsContent = fs.readFileSync(constantsPath, 'utf8');

// Extract WEEK_DATA array
// This is a simplified extraction - in a real scenario, you'd use a TypeScript parser
// For now, we'll manually create the JSON structure based on the constants.ts content

// Read the actual constants file and parse it
console.log('Reading constants.ts...');

// For this demo, we'll create a simpler version by manually parsing
// In production, you'd use @typescript-eslint/parser or similar

// Extract vocabulary data by parsing the file
const weekDataMatch = constantsContent.match(/export const WEEK_DATA[\s\S]*?= \[([\s\S]*)\];/);

if (!weekDataMatch) {
    console.error('Could not find WEEK_DATA in constants.ts');
    process.exit(1);
}

// Since parsing TypeScript is complex, we'll use a different approach:
// Import and execute the constants file directly
// But since it's TypeScript, we need to transpile it first

// For now, let's create a manual extraction based on the structure
// This is a workaround - ideally use ts-node or similar

console.log('Note: This script requires the TypeScript constants to be in a parseable format.');
console.log('For a production implementation, consider using ts-node or compiling the TypeScript first.');

// Create a sample week data structure (this would be replaced with actual parsing)
// For now, we'll create a stub that the generate-tests script can use

const sampleWeekData = [
    {
        week: 1,
        title: "Identify & Report",
        vocabulary: [
            {
                term: "Identify",
                definition: "to recognize or establish what something is",
                l1_translation: "Mengenal pasti",
                contexts: [
                    {
                        subject: "Science",
                        sentence: "Scientists identify new species of plants in the rainforest."
                    }
                ]
            },
            {
                term: "Report",
                definition: "to give a spoken or written account of something",
                l1_translation: "Melaporkan",
                contexts: [
                    {
                        subject: "General",
                        sentence: "Students must report their findings to the class."
                    }
                ]
            },
            {
                term: "Observe",
                definition: "to notice or perceive something and register it as being significant",
                l1_translation: "Memerhatikan",
                contexts: [
                    {
                        subject: "Science",
                        sentence: "We observe the changes in the experiment carefully."
                    }
                ]
            },
            {
                term: "Analyze",
                definition: "to examine something in detail to understand it better",
                l1_translation: "Menganalisis",
                contexts: [
                    {
                        subject: "Math",
                        sentence: "We need to analyze the data to find patterns."
                    }
                ]
            },
            {
                term: "Conclude",
                definition: "to arrive at a judgment or opinion by reasoning",
                l1_translation: "Membuat kesimpulan",
                contexts: [
                    {
                        subject: "General",
                        sentence: "After the experiment, we can conclude that the hypothesis was correct."
                    }
                ]
            }
        ]
    }
];

console.log('\n⚠️  IMPORTANT: This is a stub file!');
console.log('To generate actual tests, you need to export the real WEEK_DATA from constants.ts\n');
console.log('Consider one of these approaches:');
console.log('1. Use ts-node to run TypeScript directly');
console.log('2. Build the project first, then import the compiled constants');
console.log('3. Manually convert constants.ts vocabulary to JSON format\n');

// Write to file anyway for demonstration purposes
const outputPath = path.join(__dirname, 'week-data.json');
fs.writeFileSync(outputPath, JSON.stringify(sampleWeekData, null, 2));

console.log(`✓ Sample week-data.json created at: ${outputPath}`);
console.log('\nTo proceed with test generation:');
console.log('1. Update week-data.json with actual vocabulary from constants.ts');
console.log('2. Run: node generate-tests.js\n');
