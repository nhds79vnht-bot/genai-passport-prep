const REVIEW_BY_CHAPTER = {
  '第1章 AIの基礎': 'テキスト第1章（AI概論・機械学習の基礎）',
  '第2章 生成AI': 'テキスト第2章（生成AI・主要モデル・プロンプト）',
  '第3章 生成AIの技術': 'テキスト第3章（RAG・AIエージェント・MCP ほか）',
  '第4章 法律と倫理': 'テキスト第4章（法律・倫理・AI新法・ガイドライン）',
  '第5章 活用実務': 'テキスト第5章（業務活用・運用・ガバナンス実務）',
}

const TRAP_BY_TOPIC = {
  RAG: '「再学習」と混同しやすい。RAGは推論時に外部検索で知識を補完する仕組みです。',
  チャンク: 'サイズ固定が正解という問題に注意。文脈と検索精度のバランスがポイントです。',
  Embedding: '「文字列検索」と混同されがち。意味ベクトルによる類似度計算が本質です。',
  ベクトルDB: '通常DBと同じ用途と誤解されやすい。Embeddingの高速類似検索が主目的です。',
  AIエージェント: '単発Chatと混同注意。計画→実行→ツール利用の反復が特徴です。',
  MCP: 'Function Callingと同義と誤解されやすい。MCPは連携方式の標準化です。',
  'Function Calling': 'API開発そのものと混同注意。LLMが関数呼び出しを選ぶ機能です。',
  'Prompt Injection': '通常の入力エラーと混同注意。悪意ある指示でモデルを誘導する攻撃です。',
  個人情報: '「匿名化すれば何でも可」と誤解されやすい。目的限定・最小化が基本です。',
  著作権: '「AI生成物は無条件で自由」と誤解されやすい。規約と権利関係確認が必要です。',
  AI新法: 'ガイドラインと同じものと混同注意。法は大枠、ガイドラインは実務指針です。',
  ガイドライン: '法律そのものと混同注意。事業者向けの具体的行動指針です。',
  ガバナンス: '「ツール導入=ガバナンス完了」と誤解されやすい。体制とルール整備が本体です。',
  リスク管理: '「精度が高い=リスクなし」と誤解されやすい。誤判定時の影響評価が重要です。',
  ディープフェイク: '技術話題だけでなく、情報セキュリティ・倫理問題として出題されます。',
  セキュリティ: 'APIキー管理や入力情報分類など、実務的な選択肢が正解になりやすいです。',
  説明責任: '「AIが判断したから免責」と誤解されやすい。責任主体の明確化が必要です。',
}

function isAbsolutist(text) {
  return /必ず|100%|不要|禁止|完全|すべて|常に|無制限|ゼロ/.test(text)
}

function isIrrelevant(text) {
  return /DNS|物理|電源|GPU増設|会議室|UI色|印刷|SMTP|FTP|VPN|メールサーバ|ロゴ/.test(text)
}

export function enrichQuestion(item) {
  const answerSet = new Set(item.answers)
  const choiceNotes = item.choices.map((choice, index) => {
    if (answerSet.has(index)) {
      return `この選択肢が正解です。${item.explanation}`
    }
    if (isIrrelevant(choice)) {
      return 'AI試験文脈と無関係な選択肢です。キーワードに惑わされないよう注意。'
    }
    if (isAbsolutist(choice)) {
      return '「必ず」「不要」「無制限」などの極端表現は、生成AIパスポート試験では誤答になりやすい典型パターンです。'
    }
    return `「${choice}」は${item.topic}の正解条件を満たしません。${item.explanation}`
  })

  return {
    ...item,
    reviewSection: `${REVIEW_BY_CHAPTER[item.chapter]} → 「${item.topic}」`,
    examTrap: TRAP_BY_TOPIC[item.topic] ?? `「${item.topic}」は定義・目的・限界をセットで覚えると混同しにくいです。`,
    choiceNotes,
  }
}

export function enrichAll(questions) {
  return questions.map(enrichQuestion)
}
