const data = [
  {
    title: "莫小贝的补习抉择",
    content:
      "游戏规则：<br />1.  游戏时间：10分钟内完成。<br />2.  每个选择都有不同的分支，根据你的选择，游戏会有不同的结局。<br />3.  游戏共有8个主要选择节点，每个节点都有3个选项。<br />4.  游戏结束后，你会看到自己的结局，并附带对补习班利弊的总结。",
    options: [
      {
        key: 1,
        value: "开始游戏",
      },
    ],
  },
  {
    title: "第一幕：补习班的邀请",
    content:
      '小贝在同福客栈的后院玩耍，突然被朱先生叫住。朱先生说："小贝，你的学业成绩不太好，白马书院开设了补习班，专门帮助学生提升学业。你愿不愿意参加？"',
    options: [
      {
        key: 2,
        value: "A. 接受邀请",
      },
      {
        key: 11,
        value: "B. 拒绝邀请",
      },
      {
        key: 2,
        value: "C. 试探性参加",
      },
    ],
    image: {
      url: "/images/1-2.jpg",
      width: 1453,
      height: 909,
    },
  },
  {
    title: "第二幕：初入补习班",
    content:
      "小贝按照选择加入了补习班，发现课程内容丰富，但学习压力也不小。朱先生教学严谨，但有些严厉。几节课下来，小贝感到有些疲惫，但也学到了不少东西。",
    options: [
      {
        key: 3,
        value: "A. 坚持下去",
      },
      {
        key: 11,
        value: "B. 退出补习班",
      },
      {
        key: 3,
        value: "C. 和朱先生沟通",
      },
    ],
    image: {
      url: "/images/1-2.jpg",
      width: 1453,
      height: 909,
    },
  },
  {
    title: "第三幕：中期反馈",
    content:
      "几周后，小贝在补习班的学习有了初步成果。她在一次书院的考试中表现不错，得到了朱先生的表扬。然而，她发现自己练武的时间变少了，武功进步缓慢。",
    options: [
      {
        key: 4,
        value: "A. 继续补习",
      },
      {
        key: 4,
        value: "B. 调整课程",
      },
      {
        key: 11,
        value: "C. 完全退出",
      },
    ],
    image: {
      url: "/images/3.jpg",
      width: 1024,
      height: 1272,
    },
  },
  {
    title: "第四幕：意外的挑战",
    content:
      "朱先生布置了一项特别任务——准备一场大型的学业展示，需要大量时间和精力。如果小贝退出或调整课程，可能会被分配到客栈的其他事务。",
    options: [
      {
        key: 5,
        value: "A. 接受任务",
      },
      {
        key: 13,
        value: "B. 婉拒任务",
      },
      {
        key: 5,
        value: "C. 提出折中方案",
      },
    ],
    image: {
      url: "/images/4.jpg",
      width: 2884,
      height: 2560,
    },
  },
  {
    title: "第五幕：家庭的影响",
    content:
      "佟湘玉担心小贝太累，白展堂则认为这是学习机会。两人分别找小贝谈话。",
    options: [
      {
        key: 6,
        value: "A. 听从佟湘玉",
      },
      {
        key: 6,
        value: "B. 听从白展堂",
      },
      {
        key: 6,
        value: "C. 自己做决定",
      },
    ],
    image: {
      url: "/images/5.jpg",
      width: 1540,
      height: 1024,
    },
  },
  {
    title: "第六幕：朋友的建议",
    content: "燕小六建议小贝找一个平衡点，既不耽误学业，也不影响武功。",
    options: [
      {
        key: 7,
        value: "A. 接受建议",
      },
      {
        key: 7,
        value: "B. 坚持选择",
      },
      {
        key: 7,
        value: "C. 一起讨论",
      },
    ],
    image: {
      url: "/images/6.jpg",
      width: 1080,
      height: 640,
    },
  },
  {
    title: "第七幕：最终抉择",
    content:
      "如果坚持补习，可能在学业展示中大放异彩，但也可能过度劳累；如果调整或退出，则获得更多练武时间。",
    options: [
      {
        key: 8,
        value: "A. 全力以赴",
      },
      {
        key: 8,
        value: "B. 调整重心",
      },
      {
        key: 11,
        value: "C. 退出补习",
      },
    ],
    image: {
      url: "/images/7.jpg",
      width: 690,
      height: 329,
    },
  },
  {
    title: "第八幕：意外的转机",
    content:
      '朱先生宣布白马书院将举办"文武双全"比赛，小贝意识到这是证明自己的最好机会。',
    options: [
      {
        key: 14,
        value: "A. 参加比赛",
      },
      {
        key: 12,
        value: "B. 放弃比赛",
      },
      {
        key: 10,
        value: "C. 重新考虑",
      },
    ],
    image: {
      url: "/images/8.jpg",
      width: 1846,
      height: 1224,
    },
  },
  {
    title: "结局1：学霸小贝", // 9
    content:
      '小贝坚持了补习班，学业大幅提升，成为白马书院的学霸。然而武功进步缓慢，甚至被郭芙蓉嘲笑。<br /><span class="summary">补习班的<br />利：提升学业，获得知识。<br />弊：练武时间减少，武功停滞。</span>',
    options: [
      {
        key: 0,
        value: "重新开始",
      },
    ],
    image: {
      url: "/images/end1.jpg",
      width: 1024,
      height: 1024,
    },
  },
  {
    title: "结局2：平衡之道", // 10
    content:
      '小贝调整课程安排，学业提升的同时保留足够时间练武。<br /><span class="summary">补习班的<br />利：针对性帮助，减轻负担。<br />弊：需避免过度疲劳。</span>',
    options: [
      {
        key: 0,
        value: "重新开始",
      },
    ],
    image: {
      url: "/images/end2.jpg",
      width: 1628,
      height: 1024,
    },
  },
  {
    title: "结局3：退出的遗憾", // 11
    content:
      '小贝退出补习班，学业提升缓慢，考试垫底后后悔。<br /><span class="summary">补习班的<br />利：可能获得机会。<br />弊：未尝试即放弃。</span>',
    options: [
      {
        key: 0,
        value: "重新开始",
      },
    ],
    image: {
      url: "/images/end3.jpg",
      width: 2400,
      height: 1596,
    },
  },
  {
    title: "结局4：调整后的成功", // 12
    content:
      '小贝和朱先生沟通后，调整了补习内容，专注于自己最薄弱的部分。她发现学习变得更加高效，学业提升很快，同时也保留了足够的练武时间。<br /><span class="summary">补习班的<br />利：针对性强，效率高。<br />弊：需要主动沟通，找到适合自己的学习方式。</span>',
    options: [
      {
        key: 0,
        value: "重新开始",
      },
    ],
    image: {
      url: "/images/end4.jpg",
      width: 1818,
      height: 970,
    },
  },
  {
    title: "结局5：意外的转机", // 13
    content:
      '小贝调整了补习班的课程，虽然中途差点放弃，但最终坚持了下来，并在学业展示中表现出色，赢得了朱先生的赏识。她意识到，坚持和调整同样重要。<br /><span class="summary">补习班的<br />利：提升学业，获得机会。<br />弊：需要不断调整策略，避免过度劳累。</span>',
    options: [
      {
        key: 0,
        value: "重新开始",
      },
    ],
    image: {
      url: "/images/end5.jpg",
      width: 1538,
      height: 1024,
    },
  },
  {
    title: "结局6：文武双全", // 14
    content:
      '小贝在调整课程后，参加了“文武双全”的比赛。她凭借出色的学业和武功表现，赢得了比赛的冠军，成为白马书院的骄傲。<br /><span class="summary">补习班的<br />利：提升学业，同时不耽误武功练习。<br />弊：需要找到适合自己的平衡点。</span>',
    options: [
      {
        key: 0,
        value: "重新开始",
      },
    ],
    image: {
      url: "/images/end6.jpg",
      width: 1642,
      height: 1024,
    },
  },
];

export default data;
