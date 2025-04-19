export interface TaxCase {
  id: string;
  title: string;
  citation: string;
  year: number;
  summary: string;
  keyPoints: string[];
  impact: string;
}

export const taxCases: TaxCase[] = [
  {
    id: "culbertson",
    title: "Commissioner v. Culbertson",
    citation: "337 U.S. 733",
    year: 1949,
    summary: "This landmark Supreme Court case established that the existence of a partnership for tax purposes depends on whether the parties 'in good faith and acting with a business purpose intended to join together in the present conduct of the enterprise.' The Court rejected the notion that a partnership exists simply because the parties say it does.",
    keyPoints: [
      "Intent to form a partnership is crucial for tax recognition",
      "Family partnerships receive special scrutiny",
      "Capital contributions alone don't create a partnership",
      "Services or participation in management can be sufficient"
    ],
    impact: "This case established the 'intent test' for determining whether a valid partnership exists for tax purposes. It remains a fundamental principle in partnership tax law and is particularly important in family partnership situations."
  },
  {
    id: "tower",
    title: "Commissioner v. Tower",
    citation: "327 U.S. 280",
    year: 1946,
    summary: "The Supreme Court held that a husband-wife partnership was not valid for tax purposes where the wife contributed capital that had been gifted to her by her husband but provided no services. The Court emphasized that income must be taxed to the person who earns it through labor or investment.",
    keyPoints: [
      "Family partnerships face heightened scrutiny",
      "Mere paper reallocation of income within a family unit is ineffective",
      "Capital contributions must be substantial and genuine",
      "Services or management participation strengthen partnership claims"
    ],
    impact: "This case, along with Culbertson, led to the development of Section 704(e) of the Internal Revenue Code, which provides specific rules for family partnerships."
  },
  {
    id: "castle-harbour",
    title: "TIFD III-E Inc. v. United States (Castle Harbour)",
    citation: "459 F.3d 220",
    year: 2006,
    summary: "The Second Circuit held that foreign banks that received a guaranteed return on their investment in a partnership were not true partners for tax purposes, but rather lenders. The court applied the 'totality of the circumstances' test to determine that the banks did not have a meaningful stake in the success or failure of the partnership.",
    keyPoints: [
      "Economic substance trumps formal legal arrangements",
      "Guaranteed returns suggest a debt rather than equity relationship",
      "Partners must have a meaningful stake in the success or failure of the enterprise",
      "Tax avoidance motives can lead to heightened scrutiny"
    ],
    impact: "This case reinforced the principle that the economic substance of an arrangement, rather than its form, determines its tax treatment. It has significant implications for distinguishing between debt and equity in partnership structures."
  },
  {
    id: "hudspeth",
    title: "Hudspeth v. Commissioner",
    citation: "509 F.2d 1224",
    year: 1975,
    summary: "The Ninth Circuit held that payments to retiring partners for their share of unrealized receivables were ordinary income rather than capital gains. The court determined that these payments represented the partners' distributive share of partnership income rather than payments for their partnership interest.",
    keyPoints: [
      "Payments for unrealized receivables are ordinary income",
      "Section 736(a) payments are treated as distributive shares or guaranteed payments",
      "Section 736(b) payments for partnership interest can receive capital gain treatment",
      "Character of income depends on what the payment represents"
    ],
    impact: "This case clarified the tax treatment of payments to retiring partners and highlighted the importance of properly structuring buyout agreements to achieve desired tax results."
  },
  {
    id: "foxman",
    title: "Foxman v. Commissioner",
    citation: "41 T.C. 535",
    year: 1964,
    summary: "The Tax Court held that when a partnership distributed unrealized receivables to a withdrawing partner in exchange for his interest, the remaining partners recognized ordinary income when the receivables were collected. The court rejected the argument that the transaction should be treated as a sale of the partnership interest.",
    keyPoints: [
      "Distribution of unrealized receivables doesn't shift the incidence of taxation",
      "Assignment of income doctrine applies to partnership distributions",
      "Form of transaction matters for tax treatment",
      "Proper planning can affect tax results of partner withdrawals"
    ],
    impact: "This case led to changes in the partnership tax rules regarding distributions of unrealized receivables and inventory items, now addressed in Sections 751(b) and 736 of the Internal Revenue Code."
  },
  {
    id: "campbell",
    title: "Campbell v. Commissioner",
    citation: "943 F.2d 815",
    year: 1991,
    summary: "The Eighth Circuit held that a partnership's receipt of a profits interest in exchange for services was not a taxable event at the time of receipt. The court reasoned that the profits interest had only speculative value and should not be taxed until profits were actually realized.",
    keyPoints: [
      "Receipt of a profits interest for services may not be immediately taxable",
      "Distinguishes between capital interests and profits interests",
      "Speculative value can affect timing of taxation",
      "Services can be contributed to a partnership"
    ],
    impact: "This case led to the development of Rev. Proc. 93-27 and later Rev. Proc. 2001-43, which provide safe harbors for the tax treatment of partnership profits interests issued for services."
  },
  {
    id: "hubert",
    title: "Hubert Enterprises v. Commissioner",
    citation: "125 T.C. 72",
    year: 2005,
    summary: "The Tax Court held that a member's deficit restoration obligation in an LLC operating agreement was not sufficient to make the member at risk for at-risk limitation purposes. The court found that the obligation was too contingent and theoretical to create genuine economic risk.",
    keyPoints: [
      "Deficit restoration obligations must be genuine to affect at-risk amounts",
      "Economic substance matters more than formal legal obligations",
      "At-risk rules limit loss deductions beyond basis limitations",
      "LLC members face special scrutiny under at-risk rules"
    ],
    impact: "This case highlighted the importance of properly structuring deficit restoration obligations and other liability provisions in partnership and LLC agreements to achieve desired tax results."
  },
  {
    id: "canal",
    title: "Canal Corporation v. Commissioner",
    citation: "135 T.C. 199",
    year: 2010,
    summary: "The Tax Court held that a partner's indemnity agreement did not create economic risk of loss for the partner because it lacked substance. The court found that the partner did not have the financial capacity to fulfill the indemnity obligation, making it an empty promise.",
    keyPoints: [
      "Indemnity agreements must have economic substance",
      "Financial capacity to fulfill obligations is crucial",
      "Anti-abuse rules can override formal arrangements",
      "Liability allocations affect basis and at-risk amounts"
    ],
    impact: "This case reinforced the principle that liability allocations in partnerships must have economic substance and led to increased scrutiny of 'bottom-dollar' guarantees and similar arrangements."
  },
  {
    id: "dagres",
    title: "Dagres v. Commissioner",
    citation: "136 T.C. 263",
    year: 2011,
    summary: "The Tax Court held that a venture capital fund manager's activities constituted a trade or business, allowing the manager to deduct a bad debt loss as an ordinary loss rather than a capital loss. The court found that the manager was in the business of developing and selling companies for profit.",
    keyPoints: [
      "Fund management can constitute a trade or business",
      "Promoting businesses for profit can be a business itself",
      "Character of losses depends on business status",
      "Investment vs. business distinction is fact-specific"
    ],
    impact: "This case has important implications for fund managers and others in the investment industry regarding the character of their income and losses."
  },
  {
    id: "renkemeyer",
    title: "Renkemeyer, Campbell & Weaver LLP v. Commissioner",
    citation: "136 T.C. 137",
    year: 2011,
    summary: "The Tax Court held that the partners in a law firm organized as an LLP could not avoid self-employment tax by characterizing themselves as limited partners. The court found that their income derived from services they performed, not from returns on capital investment.",
    keyPoints: [
      "Service partners generally cannot avoid self-employment tax",
      "Limited partner exception depends on nature of income, not just legal status",
      "Capital-intensive vs. service partnerships are treated differently",
      "Substance over form applies to self-employment tax issues"
    ],
    impact: "This case significantly limited the ability of service professionals to avoid self-employment tax through partnership structures and led to proposed regulations addressing the definition of 'limited partner' for self-employment tax purposes."
  }
];