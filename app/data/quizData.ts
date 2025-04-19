export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const quizzes: Quiz[] = [
  {
    id: "basics",
    title: "Partnership Tax Basics",
    description: "Test your knowledge of fundamental partnership tax concepts",
    difficulty: "beginner",
    questions: [
      {
        id: "basics-1",
        question: "Which of the following is NOT a characteristic of partnership taxation?",
        options: [
          "Pass-through taxation",
          "Double taxation of profits",
          "Separately stated items",
          "Partner's basis adjustments"
        ],
        correctAnswer: 1,
        explanation: "Partnerships are pass-through entities, meaning they don't pay income tax at the entity level. Instead, income 'passes through' to the partners. Double taxation (where profits are taxed at both the entity and owner levels) is a characteristic of C corporations, not partnerships."
      },
      {
        id: "basics-2",
        question: "Which form does a partnership file with the IRS?",
        options: [
          "Form 1040",
          "Form 1120",
          "Form 1065",
          "Form 1120S"
        ],
        correctAnswer: 2,
        explanation: "Partnerships file Form 1065 (U.S. Return of Partnership Income). This is an information return that reports the partnership's income, deductions, gains, and losses. The partnership then issues Schedule K-1s to each partner showing their share of these items."
      },
      {
        id: "basics-3",
        question: "Which of the following is NOT included in a partner's initial tax basis in their partnership interest?",
        options: [
          "Cash contributed to the partnership",
          "Adjusted basis of property contributed",
          "Share of partnership liabilities",
          "Fair market value of property contributed"
        ],
        correctAnswer: 3,
        explanation: "A partner's initial basis includes cash contributed, the adjusted basis (not fair market value) of property contributed, and their share of partnership liabilities. Using fair market value instead of adjusted basis would allow partners to recognize gains or losses without a taxable event."
      },
      {
        id: "basics-4",
        question: "Which of the following will increase a partner's basis in their partnership interest?",
        options: [
          "Distributions from the partnership",
          "Partner's share of partnership losses",
          "Partner's share of partnership income",
          "Decrease in partner's share of partnership liabilities"
        ],
        correctAnswer: 2,
        explanation: "A partner's basis increases by their share of partnership income (including tax-exempt income) and increases in their share of partnership liabilities. Distributions and losses decrease basis, as do decreases in the partner's share of liabilities."
      },
      {
        id: "basics-5",
        question: "What happens if a partner receives a cash distribution that exceeds their basis in the partnership?",
        options: [
          "The excess is tax-free",
          "The excess is treated as ordinary income",
          "The excess is treated as a capital gain",
          "The distribution is not allowed"
        ],
        correctAnswer: 2,
        explanation: "When a partner receives a cash distribution that exceeds their basis in the partnership interest, the excess is treated as a capital gain. The distribution first reduces basis to zero, and then any excess is taxable as a capital gain."
      }
    ]
  },
  {
    id: "k1-boxes",
    title: "Schedule K-1 Boxes",
    description: "Test your knowledge of Schedule K-1 reporting",
    difficulty: "intermediate",
    questions: [
      {
        id: "k1-1",
        question: "Which Schedule K-1 box reports income that is generally subject to self-employment tax for general partners?",
        options: [
          "Box 1: Ordinary business income (loss)",
          "Box 2: Net rental real estate income (loss)",
          "Box 5: Interest income",
          "Box 9a: Net long-term capital gain (loss)"
        ],
        correctAnswer: 0,
        explanation: "Box 1 reports ordinary business income (loss), which is generally subject to self-employment tax for general partners. Rental income, interest income, and capital gains are not subject to self-employment tax."
      },
      {
        id: "k1-2",
        question: "Which Schedule K-1 box reports payments that are subject to self-employment tax for both general and limited partners?",
        options: [
          "Box 1: Ordinary business income (loss)",
          "Box 4: Guaranteed payments",
          "Box 19: Distributions",
          "Box 2: Net rental real estate income (loss)"
        ],
        correctAnswer: 1,
        explanation: "Box 4 reports guaranteed payments, which are subject to self-employment tax for both general and limited partners. These are payments for services or the use of capital that are determined without regard to partnership income."
      },
      {
        id: "k1-3",
        question: "Which Schedule K-1 box reports distributions that may be taxable if they exceed the partner's basis?",
        options: [
          "Box 4: Guaranteed payments",
          "Box 14: Self-employment earnings",
          "Box 19: Distributions",
          "Box 20: Other information"
        ],
        correctAnswer: 2,
        explanation: "Box 19 reports distributions from the partnership. These distributions reduce the partner's basis and are not taxable until they exceed the partner's basis. Any excess is generally taxed as a capital gain."
      },
      {
        id: "k1-4",
        question: "Which Schedule K-1 box reports income that is eligible for preferential tax rates?",
        options: [
          "Box 1: Ordinary business income (loss)",
          "Box 6b: Qualified dividends",
          "Box 4: Guaranteed payments",
          "Box 11: Other income (loss)"
        ],
        correctAnswer: 1,
        explanation: "Box 6b reports qualified dividends, which are eligible for the preferential tax rates that apply to long-term capital gains (0%, 15%, or 20% depending on the taxpayer's income level)."
      },
      {
        id: "k1-5",
        question: "Which Schedule K-1 box reports the Section 179 deduction?",
        options: [
          "Box 8: Net short-term capital gain (loss)",
          "Box 11: Other income (loss)",
          "Box 12: Section 179 deduction",
          "Box 13: Other deductions"
        ],
        correctAnswer: 2,
        explanation: "Box 12 reports the partner's share of the Section 179 deduction, which allows businesses to deduct the full purchase price of qualifying equipment in the year it's placed in service, rather than depreciating it over several years."
      }
    ]
  },
  {
    id: "basis-calc",
    title: "Partnership Basis Calculations",
    description: "Test your ability to calculate a partner's basis",
    difficulty: "advanced",
    questions: [
      {
        id: "basis-1",
        question: "Partner A contributes $50,000 cash and property with an adjusted basis of $30,000 (FMV $80,000) to a partnership. The partnership also assumes A's $20,000 liability related to the property. What is A's initial basis in the partnership interest?",
        options: [
          "$50,000",
          "$80,000",
          "$60,000",
          "$100,000"
        ],
        correctAnswer: 2,
        explanation: "A's initial basis is $60,000, calculated as: Cash contributed ($50,000) + Adjusted basis of property ($30,000) - Liability assumed by partnership ($20,000). The fair market value of the property is irrelevant for basis calculations."
      },
      {
        id: "basis-2",
        question: "Partner B has a beginning basis of $40,000 in their partnership interest. During the year, B's share of partnership ordinary income is $15,000, tax-exempt income is $5,000, and B receives a $25,000 distribution. What is B's ending basis?",
        options: [
          "$35,000",
          "$30,000",
          "$55,000",
          "$60,000"
        ],
        correctAnswer: 0,
        explanation: "B's ending basis is $35,000, calculated as: Beginning basis ($40,000) + Ordinary income ($15,000) + Tax-exempt income ($5,000) - Distribution ($25,000) = $35,000."
      },
      {
        id: "basis-3",
        question: "Partner C has a beginning basis of $20,000. During the year, the partnership allocates $30,000 of losses to C and makes a $5,000 distribution to C. How much of the loss can C deduct this year (assuming no other limitations apply)?",
        options: [
          "$30,000",
          "$25,000",
          "$20,000",
          "$15,000"
        ],
        correctAnswer: 2,
        explanation: "C can deduct $20,000 of the loss this year. A partner cannot deduct losses in excess of their basis. C's basis is reduced to zero, and the remaining $10,000 of loss is suspended and can be used in future years when C's basis increases."
      },
      {
        id: "basis-4",
        question: "Partner D has a beginning basis of $50,000. During the year, D's share of partnership recourse liabilities increases by $20,000, and D's share of partnership income is $15,000. D receives a $30,000 distribution. What is D's ending basis?",
        options: [
          "$55,000",
          "$35,000",
          "$70,000",
          "$85,000"
        ],
        correctAnswer: 0,
        explanation: "D's ending basis is $55,000, calculated as: Beginning basis ($50,000) + Increase in share of liabilities ($20,000) + Partnership income ($15,000) - Distribution ($30,000) = $55,000."
      },
      {
        id: "basis-5",
        question: "Partner E has a beginning basis of $10,000. During the year, E's share of partnership ordinary loss is $25,000, and E's share of partnership liabilities decreases by $5,000. How much of the loss can E deduct this year (assuming no other limitations apply)?",
        options: [
          "$25,000",
          "$10,000",
          "$5,000",
          "$0"
        ],
        correctAnswer: 2,
        explanation: "E can deduct $5,000 of the loss this year. The decrease in E's share of liabilities ($5,000) is treated as a deemed distribution, reducing E's basis to $5,000 ($10,000 - $5,000). E can only deduct losses up to the remaining $5,000 basis. The remaining $20,000 of loss is suspended."
      }
    ]
  },
  {
    id: "special-allocations",
    title: "Special Allocations",
    description: "Test your knowledge of special allocations in partnerships",
    difficulty: "advanced",
    questions: [
      {
        id: "special-1",
        question: "For a special allocation to have 'substantial economic effect,' which of the following is NOT required?",
        options: [
          "Capital accounts must be maintained according to tax regulations",
          "Liquidating distributions must be made according to capital account balances",
          "Partners with deficit capital accounts must restore the deficit",
          "Allocations must be proportional to partnership interests"
        ],
        correctAnswer: 3,
        explanation: "Special allocations, by definition, are not proportional to partnership interests. The other three requirements are necessary for a special allocation to have 'substantial economic effect' and be respected for tax purposes."
      },
      {
        id: "special-2",
        question: "Which of the following is an example of a special allocation?",
        options: [
          "Allocating 50% of all partnership items to a partner with a 50% interest",
          "Allocating 100% of depreciation deductions to the partner who contributed the depreciable property",
          "Allocating guaranteed payments to a partner for services",
          "Allocating distributions based on capital account balances"
        ],
        correctAnswer: 1,
        explanation: "Allocating 100% of depreciation deductions to the partner who contributed the depreciable property is an example of a special allocation because it differs from the general profit and loss sharing ratio. This allocation must have substantial economic effect to be respected for tax purposes."
      },
      {
        id: "special-3",
        question: "If a special allocation lacks substantial economic effect, how will the IRS reallocate the item?",
        options: [
          "According to the partners' capital interests",
          "According to the partners' interests in the partnership (PIP)",
          "Equally among all partners",
          "The allocation will be disallowed entirely"
        ],
        correctAnswer: 1,
        explanation: "If a special allocation lacks substantial economic effect, the IRS will reallocate the item according to the partners' interests in the partnership (PIP). This is a facts and circumstances determination that considers various economic factors."
      },
      {
        id: "special-4",
        question: "Which of the following is a valid business purpose for a special allocation?",
        options: [
          "To shift income to partners in lower tax brackets",
          "To compensate a partner for contributing property with built-in gain",
          "To avoid the passive activity loss limitations",
          "To avoid self-employment tax"
        ],
        correctAnswer: 1,
        explanation: "Compensating a partner for contributing property with built-in gain is a valid business purpose for a special allocation. Special allocations made purely for tax avoidance purposes will not be respected by the IRS."
      },
      {
        id: "special-5",
        question: "Under the economic effect test, what happens if a partner has a deficit capital account upon liquidation and is not obligated to restore it?",
        options: [
          "The partnership must allocate income to eliminate the deficit",
          "The special allocation will not have economic effect",
          "The partner must contribute additional capital",
          "The deficit is allocated to other partners"
        ],
        correctAnswer: 1,
        explanation: "If a partner has a deficit capital account upon liquidation and is not obligated to restore it, the special allocation will not have economic effect under the basic economic effect test. However, it may still have economic effect under the alternate test if the partnership has a qualified income offset provision."
      }
    ]
  },
  {
    id: "loss-limitations",
    title: "Partnership Loss Limitations",
    description: "Test your knowledge of the three loss limitation rules",
    difficulty: "advanced",
    questions: [
      {
        id: "loss-1",
        question: "Which loss limitation is applied first when determining a partner's deductible loss?",
        options: [
          "At-risk limitation",
          "Passive activity loss limitation",
          "Basis limitation",
          "They are applied simultaneously"
        ],
        correctAnswer: 2,
        explanation: "The basis limitation is applied first, followed by the at-risk limitation, and finally the passive activity loss limitation. A partner cannot deduct losses in excess of their basis in the partnership interest, regardless of the other limitations."
      },
      {
        id: "loss-2",
        question: "Partner F has a $30,000 loss from a partnership. F's basis is $25,000, at-risk amount is $20,000, and F materially participates in the partnership. How much of the loss can F deduct this year?",
        options: [
          "$30,000",
          "$25,000",
          "$20,000",
          "$0"
        ],
        correctAnswer: 2,
        explanation: "F can deduct $20,000 of the loss. First, the basis limitation limits the deduction to $25,000. Then, the at-risk limitation further limits it to $20,000. Since F materially participates, the passive activity loss limitation doesn't apply."
      },
      {
        id: "loss-3",
        question: "Which of the following would NOT increase a partner's at-risk amount?",
        options: [
          "Cash contributed to the partnership",
          "Adjusted basis of property contributed",
          "Nonrecourse liabilities allocated to the partner",
          "Recourse liabilities for which the partner is personally liable"
        ],
        correctAnswer: 2,
        explanation: "Nonrecourse liabilities allocated to the partner do not increase the partner's at-risk amount. A partner is at risk for cash and property contributed and for recourse liabilities for which they are personally liable."
      },
      {
        id: "loss-4",
        question: "What happens to losses that are disallowed due to the passive activity loss limitation?",
        options: [
          "They are permanently disallowed",
          "They are carried forward indefinitely until the partner has passive income or disposes of the interest",
          "They are carried back to the previous three tax years",
          "They reduce the partner's basis in the partnership interest"
        ],
        correctAnswer: 1,
        explanation: "Losses disallowed due to the passive activity loss limitation are carried forward indefinitely. They can be used in future years when the partner has passive income or when the partner disposes of the entire interest in the activity in a fully taxable transaction."
      },
      {
        id: "loss-5",
        question: "Which of the following activities would generally be considered passive for a limited partner?",
        options: [
          "A partnership in which the limited partner works 500 hours per year",
          "A partnership in which the limited partner is also a general partner",
          "A rental real estate partnership in which the limited partner qualifies as a real estate professional",
          "A partnership in which the limited partner does not materially participate"
        ],
        correctAnswer: 3,
        explanation: "A partnership in which the limited partner does not materially participate would generally be considered passive. Material participation generally requires regular, continuous, and substantial involvement in the operations of the activity."
      }
    ]
  }
];