export interface K1Box {
  id: string;
  title: string;
  description: string;
  details: string;
  examples: Example[];
  relatedBoxes?: string[];
  tips: string[];
}

interface Example {
  scenario: string;
  calculation?: string;
  result: string;
}

export const k1Boxes: K1Box[] = [
  {
    id: "box1",
    title: "Box 1: Ordinary Business Income (Loss)",
    description: "Your share of the partnership's ordinary business income or loss.",
    details: "This is the most common type of partnership income. It includes income from the partnership's trade or business operations minus business expenses. This income is reported on Schedule E of your Form 1040 and is subject to ordinary income tax rates. For general partners, this income is typically subject to self-employment tax.",
    examples: [
      {
        scenario: "You own 25% of a partnership that reported $100,000 of ordinary business income.",
        calculation: "$100,000 × 25% = $25,000",
        result: "You would report $25,000 on Schedule E of your Form 1040."
      },
      {
        scenario: "You're a limited partner with a 30% interest in a partnership that reported a $50,000 ordinary business loss.",
        calculation: "$50,000 × 30% = $15,000 loss",
        result: "You would report a $15,000 loss on Schedule E, subject to basis, at-risk, and passive activity loss limitations."
      }
    ],
    relatedBoxes: ["box4", "box14"],
    tips: [
      "As a general partner, this income is subject to self-employment tax.",
      "Limited partners generally don't pay self-employment tax on Box 1 income.",
      "Losses can offset other income but are subject to basis, at-risk, and passive activity loss limitations."
    ]
  },
  {
    id: "box2",
    title: "Box 2: Net Rental Real Estate Income (Loss)",
    description: "Your share of the partnership's net income or loss from rental real estate activities.",
    details: "This represents your share of income or loss from rental real estate activities conducted by the partnership. This income is not subject to self-employment tax. However, rental real estate activities are generally considered passive activities, and losses may be limited by the passive activity loss rules unless you qualify as a real estate professional.",
    examples: [
      {
        scenario: "You own 50% of a partnership that reported $60,000 of net rental real estate income.",
        calculation: "$60,000 × 50% = $30,000",
        result: "You would report $30,000 on Schedule E of your Form 1040."
      },
      {
        scenario: "Your partnership reports a $40,000 rental real estate loss, and your share is 25%.",
        calculation: "$40,000 × 25% = $10,000 loss",
        result: "You would report a $10,000 loss on Schedule E, subject to passive activity loss limitations unless you qualify as a real estate professional."
      }
    ],
    relatedBoxes: ["box3", "box9a"],
    tips: [
      "This income is not subject to self-employment tax.",
      "Losses are generally subject to passive activity loss limitations.",
      "If you qualify as a real estate professional, you may be able to deduct losses in full against non-passive income."
    ]
  },
  {
    id: "box3",
    title: "Box 3: Other Net Rental Income (Loss)",
    description: "Your share of the partnership's net income or loss from rental activities other than real estate.",
    details: "This includes income or loss from renting personal property, such as equipment or vehicles. Like rental real estate income, this income is not subject to self-employment tax, but losses are generally subject to the passive activity loss limitations.",
    examples: [
      {
        scenario: "Your partnership rents out equipment and reports $20,000 of net rental income. Your share is 40%.",
        calculation: "$20,000 × 40% = $8,000",
        result: "You would report $8,000 on Schedule E of your Form 1040."
      }
    ],
    relatedBoxes: ["box2"],
    tips: [
      "This income is not subject to self-employment tax.",
      "Losses are generally subject to passive activity loss limitations.",
      "Distinguish between this box and Box 2, which is specifically for real estate rentals."
    ]
  },
  {
    id: "box4",
    title: "Box 4: Guaranteed Payments",
    description: "Payments made to you for services or the use of capital, determined without regard to partnership income.",
    details: "Guaranteed payments are payments made to partners for services rendered or for the use of capital, regardless of whether the partnership has income. These payments are similar to a salary for partners and are reported on Schedule E. Unlike distributive shares of partnership income, guaranteed payments are always subject to self-employment tax for both general and limited partners.",
    examples: [
      {
        scenario: "You receive $5,000 per month as a guaranteed payment for managing the partnership.",
        calculation: "$5,000 × 12 months = $60,000",
        result: "You would report $60,000 on Schedule E and pay self-employment tax on this amount."
      }
    ],
    relatedBoxes: ["box1", "box14"],
    tips: [
      "Always subject to self-employment tax, even for limited partners.",
      "Deductible by the partnership as a business expense.",
      "Reported separately from your distributive share of partnership income."
    ]
  },
  {
    id: "box5",
    title: "Box 5: Interest Income",
    description: "Your share of the partnership's interest income.",
    details: "This is your share of the partnership's taxable interest income from investments such as bank accounts, loans, and bonds. This income is reported on Schedule B of your Form 1040 if the total interest income from all sources exceeds $1,500.",
    examples: [
      {
        scenario: "Your partnership earned $10,000 in interest from investments, and your share is 30%.",
        calculation: "$10,000 × 30% = $3,000",
        result: "You would report $3,000 on Schedule B of your Form 1040."
      }
    ],
    tips: [
      "Not subject to self-employment tax.",
      "May be subject to the Net Investment Income Tax if your income exceeds certain thresholds.",
      "Tax-exempt interest is reported separately in Box 18, Code A."
    ]
  },
  {
    id: "box6a",
    title: "Box 6a: Ordinary Dividends",
    description: "Your share of the partnership's ordinary dividends.",
    details: "This represents your share of the partnership's ordinary dividend income from investments in stocks and mutual funds. This income is reported on Schedule B of your Form 1040 if the total dividend income from all sources exceeds $1,500.",
    examples: [
      {
        scenario: "Your partnership received $15,000 in ordinary dividends, and your share is 25%.",
        calculation: "$15,000 × 25% = $3,750",
        result: "You would report $3,750 on Schedule B of your Form 1040."
      }
    ],
    relatedBoxes: ["box6b"],
    tips: [
      "Not subject to self-employment tax.",
      "May be subject to the Net Investment Income Tax if your income exceeds certain thresholds.",
      "The sum of Boxes 6a and 6b represents your total dividend income from the partnership."
    ]
  },
  {
    id: "box6b",
    title: "Box 6b: Qualified Dividends",
    description: "Your share of the partnership's qualified dividends.",
    details: "This is the portion of your ordinary dividends that qualifies for the lower tax rates that apply to long-term capital gains. Qualified dividends are reported on both Schedule B and Form 1040. To be qualified, dividends must be paid by a U.S. corporation or a qualified foreign corporation, and you must have held the stock for more than 60 days during the 121-day period that begins 60 days before the ex-dividend date.",
    examples: [
      {
        scenario: "Of the $3,750 in ordinary dividends you received, $2,500 are qualified dividends.",
        result: "You would report $2,500 on Form 1040 line 3a and benefit from the lower tax rates on qualified dividends."
      }
    ],
    relatedBoxes: ["box6a"],
    tips: [
      "Taxed at the lower long-term capital gains rates (0%, 15%, or 20% depending on your income).",
      "Always a subset of the amount in Box 6a (ordinary dividends).",
      "May be subject to the Net Investment Income Tax if your income exceeds certain thresholds."
    ]
  },
  {
    id: "box7",
    title: "Box 7: Royalties",
    description: "Your share of the partnership's royalty income.",
    details: "This represents your share of royalty income received by the partnership from intellectual property, natural resources, or other assets. Royalty income is reported on Schedule E of your Form 1040.",
    examples: [
      {
        scenario: "Your partnership received $50,000 in royalties from oil and gas properties, and your share is 20%.",
        calculation: "$50,000 × 20% = $10,000",
        result: "You would report $10,000 on Schedule E of your Form 1040."
      }
    ],
    tips: [
      "Not subject to self-employment tax.",
      "May be subject to the Net Investment Income Tax if your income exceeds certain thresholds.",
      "Royalties from natural resources may be eligible for depletion allowances."
    ]
  },
  {
    id: "box8",
    title: "Box 8: Net Short-Term Capital Gain (Loss)",
    description: "Your share of the partnership's net short-term capital gain or loss.",
    details: "This is your share of the partnership's net capital gain or loss from the sale of capital assets held for one year or less. Short-term capital gains are taxed at ordinary income tax rates. This amount is reported on Schedule D of your Form 1040.",
    examples: [
      {
        scenario: "Your partnership sold stocks held for 6 months, resulting in a $12,000 short-term capital gain. Your share is 33%.",
        calculation: "$12,000 × 33% = $3,960",
        result: "You would report $3,960 on Schedule D of your Form 1040, taxed at ordinary income rates."
      }
    ],
    relatedBoxes: ["box9a"],
    tips: [
      "Taxed at ordinary income tax rates.",
      "Can be offset by capital losses.",
      "Not subject to self-employment tax."
    ]
  },
  {
    id: "box9a",
    title: "Box 9a: Net Long-Term Capital Gain (Loss)",
    description: "Your share of the partnership's net long-term capital gain or loss.",
    details: "This represents your share of the partnership's net capital gain or loss from the sale of capital assets held for more than one year. Long-term capital gains are generally taxed at lower rates than ordinary income. This amount is reported on Schedule D of your Form 1040.",
    examples: [
      {
        scenario: "Your partnership sold real estate held for 5 years, resulting in a $100,000 long-term capital gain. Your share is 25%.",
        calculation: "$100,000 × 25% = $25,000",
        result: "You would report $25,000 on Schedule D of your Form 1040, taxed at the preferential long-term capital gains rates."
      }
    ],
    relatedBoxes: ["box8"],
    tips: [
      "Taxed at preferential long-term capital gains rates (0%, 15%, or 20% depending on your income).",
      "Can be offset by capital losses.",
      "May be subject to the Net Investment Income Tax if your income exceeds certain thresholds."
    ]
  },
  {
    id: "box10",
    title: "Box 10: Net Section 1231 Gain (Loss)",
    description: "Your share of the partnership's net section 1231 gain or loss.",
    details: "Section 1231 gains or losses come from the sale of business property held for more than one year. This includes depreciable business property, real property used in a trade or business, and certain other assets. Net Section 1231 gains are treated as long-term capital gains (taxed at lower rates), while net Section 1231 losses are treated as ordinary losses (fully deductible against ordinary income).",
    examples: [
      {
        scenario: "Your partnership sold business equipment for a $30,000 Section 1231 gain. Your share is 40%.",
        calculation: "$30,000 × 40% = $12,000",
        result: "You would report $12,000 on Form 4797 and then transfer it to Schedule D, where it would be taxed at the preferential long-term capital gains rates."
      }
    ],
    tips: [
      "Net gains are treated as long-term capital gains (lower tax rates).",
      "Net losses are treated as ordinary losses (fully deductible against ordinary income).",
      "Subject to recapture as ordinary income to the extent of prior Section 1231 losses in the last five years."
    ]
  },
  {
    id: "box11",
    title: "Box 11: Other Income (Loss)",
    description: "Your share of the partnership's other income or loss not included in Boxes 1 through 10.",
    details: "This box includes any other income or loss that doesn't fit into the other categories on Schedule K-1. The partnership should provide a statement explaining what this income or loss represents. Common types include gambling winnings, cancellation of debt income, and income from discharge of indebtedness.",
    examples: [
      {
        scenario: "Your partnership had $20,000 of cancellation of debt income. Your share is 30%.",
        calculation: "$20,000 × 30% = $6,000",
        result: "You would report $6,000 as other income on your Form 1040, unless an exclusion applies."
      }
    ],
    tips: [
      "Check the attached statement for details on what this income or loss represents.",
      "The tax treatment depends on the specific type of income or loss.",
      "Some types of income in this box may be exempt from tax under certain circumstances."
    ]
  },
  {
    id: "box12",
    title: "Box 12: Section 179 Deduction",
    description: "Your share of the partnership's Section 179 deduction.",
    details: "The Section 179 deduction allows businesses to deduct the full purchase price of qualifying equipment and software purchased or financed during the tax year, rather than depreciating it over several years. There are limits to the total amount that can be deducted and the total amount of equipment that can be purchased. This deduction is reported on Form 4562 of your tax return.",
    examples: [
      {
        scenario: "Your partnership purchased $150,000 of qualifying equipment and elected to take a Section 179 deduction. Your share is 25%.",
        calculation: "$150,000 × 25% = $37,500",
        result: "You would report $37,500 on Form 4562 and then as a deduction on Schedule E."
      }
    ],
    tips: [
      "Subject to business income limitations on your personal return.",
      "Cannot create or increase a loss from your business activities.",
      "May be subject to recapture if the property is disposed of before the end of its recovery period."
    ]
  },
  {
    id: "box13",
    title: "Box 13: Other Deductions",
    description: "Your share of the partnership's deductions not included in other boxes.",
    details: "This box includes various deductions that don't fit elsewhere on Schedule K-1. The partnership should provide a statement with a code identifying each type of deduction. Common deductions include charitable contributions, investment interest expense, and deductions related to portfolio income.",
    examples: [
      {
        scenario: "Your partnership made $10,000 in charitable contributions. Your share is 20%.",
        calculation: "$10,000 × 20% = $2,000",
        result: "You would report $2,000 on Schedule A of your Form 1040 as a charitable contribution deduction."
      }
    ],
    tips: [
      "Check the attached statement for codes identifying each type of deduction.",
      "Different deductions may be reported on different schedules of your tax return.",
      "Some deductions may be subject to limitations on your personal return."
    ]
  },
  {
    id: "box14",
    title: "Box 14: Self-Employment Earnings (Loss)",
    description: "Your share of partnership income that is subject to self-employment tax.",
    details: "This box shows the amount of your partnership income that is subject to self-employment tax (Social Security and Medicare taxes). For general partners, this typically includes ordinary business income from Box 1 and guaranteed payments from Box 4. Limited partners generally only pay self-employment tax on guaranteed payments for services.",
    examples: [
      {
        scenario: "You're a general partner with $25,000 of ordinary business income (Box 1) and $60,000 of guaranteed payments (Box 4).",
        calculation: "$25,000 + $60,000 = $85,000",
        result: "You would report $85,000 on Schedule SE of your Form 1040 and pay self-employment tax on this amount."
      },
      {
        scenario: "You're a limited partner with $25,000 of ordinary business income (Box 1) and $60,000 of guaranteed payments (Box 4).",
        result: "You would report only the $60,000 of guaranteed payments on Schedule SE and pay self-employment tax on this amount."
      }
    ],
    relatedBoxes: ["box1", "box4"],
    tips: [
      "General partners pay self-employment tax on their share of ordinary business income and guaranteed payments.",
      "Limited partners generally only pay self-employment tax on guaranteed payments for services.",
      "The self-employment tax rate is 15.3% (12.4% for Social Security up to the wage base limit and 2.9% for Medicare with no limit)."
    ]
  },
  {
    id: "box15",
    title: "Box 15: Credits",
    description: "Your share of the partnership's credits.",
    details: "This box shows your share of various tax credits earned by the partnership. The partnership should provide a statement with a code identifying each type of credit. Common credits include the low-income housing credit, rehabilitation credit, and foreign tax credit.",
    examples: [
      {
        scenario: "Your partnership earned a $50,000 low-income housing credit. Your share is 30%.",
        calculation: "$50,000 × 30% = $15,000",
        result: "You would report $15,000 on Form 8586 and then transfer it to your Form 1040 as a credit against your tax liability."
      }
    ],
    tips: [
      "Credits directly reduce your tax liability, dollar for dollar.",
      "Check the attached statement for codes identifying each type of credit.",
      "Some credits may be subject to limitations or require additional forms."
    ]
  },
  {
    id: "box16",
    title: "Box 16: Foreign Transactions",
    description: "Your share of the partnership's foreign taxes paid or accrued and foreign income.",
    details: "This box provides information about foreign taxes paid or accrued by the partnership and foreign source income. You may be able to claim a foreign tax credit or a deduction for your share of foreign taxes paid. The partnership should provide a statement with codes identifying the type and source of foreign income and taxes.",
    examples: [
      {
        scenario: "Your partnership paid $10,000 in foreign taxes on foreign source income. Your share is 25%.",
        calculation: "$10,000 × 25% = $2,500",
        result: "You may be able to claim a $2,500 foreign tax credit on Form 1116 or deduct this amount on Schedule A."
      }
    ],
    tips: [
      "You can either claim a credit for foreign taxes paid (Form 1116) or deduct them (Schedule A).",
      "The credit is generally more beneficial than the deduction.",
      "Check the attached statement for codes identifying the type and source of foreign income and taxes."
    ]
  },
  {
    id: "box17",
    title: "Box 17: Alternative Minimum Tax (AMT) Items",
    description: "Your share of the partnership's AMT adjustments and preferences.",
    details: "This box shows your share of the partnership's alternative minimum tax (AMT) adjustments and preferences. These items may increase or decrease your alternative minimum taxable income. The partnership should provide a statement with codes identifying each AMT item.",
    examples: [
      {
        scenario: "Your partnership has $20,000 of AMT depreciation adjustment. Your share is 30%.",
        calculation: "$20,000 × 30% = $6,000",
        result: "You would report $6,000 on Form 6251 as an AMT adjustment."
      }
    ],
    tips: [
      "These items may increase or decrease your alternative minimum taxable income.",
      "Check the attached statement for codes identifying each AMT item.",
      "The AMT impact depends on your overall tax situation."
    ]
  },
  {
    id: "box18",
    title: "Box 18: Tax-Exempt Income and Nondeductible Expenses",
    description: "Your share of the partnership's tax-exempt income and nondeductible expenses.",
    details: "This box shows your share of the partnership's tax-exempt income (such as municipal bond interest) and nondeductible expenses (such as penalties or the non-deductible portion of meals and entertainment). While tax-exempt income is not taxable, it may affect the basis in your partnership interest. Nondeductible expenses reduce your basis but are not deductible on your tax return.",
    examples: [
      {
        scenario: "Your partnership earned $15,000 of tax-exempt interest from municipal bonds. Your share is 25%.",
        calculation: "$15,000 × 25% = $3,750",
        result: "You would not report this income as taxable, but it would increase your basis in the partnership."
      },
      {
        scenario: "Your partnership had $5,000 of nondeductible expenses. Your share is 25%.",
        calculation: "$5,000 × 25% = $1,250",
        result: "You cannot deduct this amount on your tax return, but it would decrease your basis in the partnership."
      }
    ],
    tips: [
      "Tax-exempt income increases your basis but is not taxable.",
      "Nondeductible expenses decrease your basis but are not deductible on your tax return.",
      "Tax-exempt income may affect the taxability of your Social Security benefits and the deductibility of investment interest expense."
    ]
  },
  {
    id: "box19",
    title: "Box 19: Distributions",
    description: "Your share of the partnership's distributions of cash and property.",
    details: "This box shows the distributions you received from the partnership during the tax year, including cash and the fair market value of property. Distributions generally reduce your basis in the partnership interest but are not taxable until they exceed your basis.",
    examples: [
      {
        scenario: "You received $30,000 in cash distributions from the partnership during the year. Your basis before distributions was $50,000.",
        result: "The $30,000 distribution would reduce your basis to $20,000 but would not be taxable."
      },
      {
        scenario: "You received $60,000 in cash distributions. Your basis before distributions was $50,000.",
        calculation: "$60,000 - $50,000 = $10,000",
        result: "The first $50,000 would reduce your basis to zero, and the excess $10,000 would be taxable as a capital gain."
      }
    ],
    tips: [
      "Distributions reduce your basis in the partnership interest.",
      "Distributions in excess of basis are taxable as capital gains.",
      "Property distributions have special rules for basis and holding period."
    ]
  },
  {
    id: "box20",
    title: "Box 20: Other Information",
    description: "Additional information about your partnership interest.",
    details: "This box provides various pieces of information that don't fit elsewhere on Schedule K-1. The partnership should provide a statement with codes identifying each item. Common items include information needed to compute the qualified business income deduction, gross receipts for certain tax elections, and information about at-risk and passive activity limitations.",
    examples: [
      {
        scenario: "Your partnership provides information about your share of qualified business income for purposes of the Section 199A deduction.",
        result: "You would use this information to calculate your qualified business income deduction on Form 8995 or 8995-A."
      }
    ],
    tips: [
      "Check the attached statement for codes identifying each item.",
      "Some items may require additional forms or calculations.",
      "This information may be crucial for various tax benefits and limitations."
    ]
  }
];