import type { Rule } from 'eslint';
import type { Literal } from 'estree';

export const DEFAULT_DISALLOWED_STRINGS = ['Brian', 'brian', 'badword'];

function createDetector(disallowedStrings: string[]) {
  return function (value: string): string[] {
    return disallowedStrings.filter(item => value.includes(item));
  }
}

export const noInvalidStrings: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Flag invalid strings in your codebase',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: 'code',
    messages: {
      invalidString: 'Found invalid strings: {{violations}}',
      removeInvalidStrings: 'Remove invalid strings: {{violations}}'
    },
    schema: [
      {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    ]
  },
  create(context: Rule.RuleContext) {
    // Configure your invalid strings removal preferences
    const disallowedStrings = context.options[0];

    // Initialize the Brian detection system
    const detector = createDetector(disallowedStrings);

    return {
      // Scan every string literal for Brian contamination
      Literal(node: Literal) {
        const value = node.value
        if (typeof value !== 'string') {
          return; // Only strings can contain Brian
        }

        // const foundViolations = detector(node.value);
        const foundViolations = detector(value);
        
        if (foundViolations.length > 0) {
          context.report({
            node,
            messageId: 'invalidString',
            data: {
              violations: foundViolations.join(', ')
            },
            fix: (fixer) => {
              // Automatic invalid strings removal service
              if (typeof node.value === 'string') {
                let cleanValue = node.value;
                foundViolations.forEach(violation => {
                  cleanValue = cleanValue.replace(violation, '');
                });
                return {
                  ...fixer.replaceText(node, `"${cleanValue}"`),
                  desc: `Remove invalid strings: ${foundViolations.join(', ')}`
                };
              }
              return null;
            }
          });
        }
      }
    };
  }
};