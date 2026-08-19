import type { Question } from '../lib/types'

export const questionBank: Question[] = [
  {
    id: 'q001',
    chapter: '第1章 AIの基礎',
    topic: 'AIの定義',
    prompt: 'AIの説明として最も適切なのはどれですか。',
    choices: [
      '人間の知的作業をコンピュータで実行する技術',
      '電源管理専用の技術',
      '画像保存だけを行う技術',
      '必ず自律ロボットを指す用語'
    ],
    answers: [
      0
    ],
    explanation: 'AIは知的作業の自動化・支援を目指す技術の総称です。'
  },
  {
    id: 'q002',
    chapter: '第1章 AIの基礎',
    topic: 'AIの定義',
    prompt: 'AI活用の目的として適切なのはどれですか。',
    choices: [
      '判断や予測の支援',
      '人の確認を完全に排除すること',
      'データ収集の停止',
      '説明責任の放棄'
    ],
    answers: [
      0
    ],
    explanation: 'AIは業務効率化や意思決定支援に使われます。'
  },
  {
    id: 'q003',
    chapter: '第1章 AIの基礎',
    topic: 'AIの歴史',
    prompt: '第1次AIブームの特徴として近いのはどれですか。',
    choices: [
      '探索と推論に期待が集まった',
      '大規模言語モデルの普及',
      'GPUクラウドの一般化',
      'RAGの標準化'
    ],
    answers: [
      0
    ],
    explanation: '初期のAIブームでは探索・推論が中心でした。'
  },
  {
    id: 'q004',
    chapter: '第1章 AIの基礎',
    topic: 'AIの歴史',
    prompt: '近年のAI発展要因として適切なものを2つ選んでください。',
    choices: [
      '計算資源の増大',
      '大量データの利用',
      '学習データ不要化',
      '検証工程の廃止'
    ],
    answers: [
      0,
      1
    ],
    explanation: '計算資源とデータ量の増加が性能向上に寄与しています。'
  },
  {
    id: 'q005',
    chapter: '第1章 AIの基礎',
    topic: '弱いAI',
    prompt: '弱いAI（ANI）の説明として正しいのはどれですか。',
    choices: [
      '特定タスクに特化したAI',
      '人間と同等の汎用知能',
      '意識を持つAI',
      '自己複製するAI'
    ],
    answers: [
      0
    ],
    explanation: '弱いAIは限定的な用途に特化したAIです。'
  },
  {
    id: 'q006',
    chapter: '第1章 AIの基礎',
    topic: '強いAI',
    prompt: '強いAI（AGI）に関する説明として適切なのはどれですか。',
    choices: [
      '人間並みの汎用知能を目指す概念',
      '現在すべて実用化済み',
      '画像分類専用AI',
      'ルールベースのみのAI'
    ],
    answers: [
      0
    ],
    explanation: 'AGIは汎用的知能を目指す概念で、実用化は研究段階です。'
  },
  {
    id: 'q007',
    chapter: '第1章 AIの基礎',
    topic: '教師あり学習',
    prompt: '教師あり学習の特徴として正しいのはどれですか。',
    choices: [
      '正解ラベル付きデータで学習する',
      'ラベルなしデータのみ使用',
      '報酬関数が不要',
      '必ずクラスタリングのみ'
    ],
    answers: [
      0
    ],
    explanation: '教師あり学習は入力と正解ラベルのペアで学習します。'
  },
  {
    id: 'q008',
    chapter: '第1章 AIの基礎',
    topic: '教師あり学習',
    prompt: '教師あり学習の用途として適切なものを2つ選んでください。',
    choices: [
      '画像分類',
      'スパム判定',
      '異常検知のみ',
      '目的関数なし学習'
    ],
    answers: [
      0,
      1
    ],
    explanation: '分類問題は教師あり学習の代表例です。'
  },
  {
    id: 'q009',
    chapter: '第1章 AIの基礎',
    topic: '教師なし学習',
    prompt: '教師なし学習の例として適切なのはどれですか。',
    choices: [
      'クラスタリング',
      'ラベル付き回帰',
      '教師データ必須の分類',
      '人手ラベル100%必須'
    ],
    answers: [
      0
    ],
    explanation: 'クラスタリングは教師なし学習の典型です。'
  },
  {
    id: 'q010',
    chapter: '第1章 AIの基礎',
    topic: '教師なし学習',
    prompt: '教師なし学習の目的として適切なのはどれですか。',
    choices: [
      'データ内の構造やパターンを見つける',
      '必ず正解ラベルを予測する',
      '報酬を最大化する',
      '推論速度だけを最適化する'
    ],
    answers: [
      0
    ],
    explanation: '構造発見が主目的です。'
  },
  {
    id: 'q011',
    chapter: '第1章 AIの基礎',
    topic: '強化学習',
    prompt: '強化学習の説明として正しいのはどれですか。',
    choices: [
      '試行錯誤で報酬を最大化する学習',
      'ラベル付きデータのみ使用',
      'ルール固定のみ',
      '推論時に学習不可'
    ],
    answers: [
      0
    ],
    explanation: '強化学習は環境との相互作用で方策を学びます。'
  },
  {
    id: 'q012',
    chapter: '第1章 AIの基礎',
    topic: '強化学習',
    prompt: '強化学習の要素として適切なものを2つ選んでください。',
    choices: [
      'エージェント',
      '報酬',
      '正解ラベル必須',
      '固定ルールのみ'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'エージェントと報酬設計が中心です。'
  },
  {
    id: 'q013',
    chapter: '第1章 AIの基礎',
    topic: 'ディープラーニング',
    prompt: 'ディープラーニングの特徴として正しいのはどれですか。',
    choices: [
      '多層ニューラルネットワークを用いる',
      '必ず少量データのみ',
      'ルールベースのみ',
      '学習不可'
    ],
    answers: [
      0
    ],
    explanation: '多層構造で特徴を自動抽出します。'
  },
  {
    id: 'q014',
    chapter: '第1章 AIの基礎',
    topic: 'ディープラーニング',
    prompt: 'CNNが得意とするタスクはどれですか。',
    choices: [
      '画像認識',
      '時系列のみ不可',
      '表形式データ不可',
      'テキスト不可'
    ],
    answers: [
      0
    ],
    explanation: 'CNNは画像処理で広く使われます。'
  },
  {
    id: 'q015',
    chapter: '第1章 AIの基礎',
    topic: '過学習',
    prompt: '過学習（オーバーフィッティング）の説明として正しいのはどれですか。',
    choices: [
      '訓練データに過度に適合し汎化性能が低下する',
      '常に性能が向上する',
      '検証データで必ず改善',
      'データ不足と無関係'
    ],
    answers: [
      0
    ],
    explanation: '訓練データへの過適合が問題です。'
  },
  {
    id: 'q016',
    chapter: '第1章 AIの基礎',
    topic: '過学習',
    prompt: '過学習対策として適切なものを2つ選んでください。',
    choices: [
      '正則化',
      'データ拡張',
      '評価データの削除',
      '検証省略'
    ],
    answers: [
      0,
      1
    ],
    explanation: '正則化とデータ拡張は一般的な対策です。'
  },
  {
    id: 'q017',
    chapter: '第1章 AIの基礎',
    topic: 'データ品質',
    prompt: '学習データ品質向上の基本として正しいのはどれですか。',
    choices: [
      '欠損・偏り・ラベル誤りを確認する',
      '品質確認を省略する',
      'データ量だけ増やす',
      '出典確認不要'
    ],
    answers: [
      0
    ],
    explanation: '品質確認はモデル性能に直結します。'
  },
  {
    id: 'q018',
    chapter: '第1章 AIの基礎',
    topic: 'バイアス',
    prompt: 'AIバイアスへの対応として適切なのはどれですか。',
    choices: [
      'データと評価指標で公平性を確認する',
      '偏りを放置する',
      '説明責任を放棄',
      '監査不要'
    ],
    answers: [
      0
    ],
    explanation: '公平性評価は重要です。'
  },
  {
    id: 'q019',
    chapter: '第1章 AIの基礎',
    topic: '説明可能性',
    prompt: '説明可能AI（XAI）の目的として適切なのはどれですか。',
    choices: [
      '判断根拠を理解可能にする',
      'モデルを常に非公開にする',
      '説明を禁止する',
      '監査ログ削除'
    ],
    answers: [
      0
    ],
    explanation: '利用者・監査者が理解できる説明が目的です。'
  },
  {
    id: 'q020',
    chapter: '第1章 AIの基礎',
    topic: 'AI活用分野',
    prompt: 'AI活用例として適切なものを2つ選んでください。',
    choices: [
      '需要予測',
      '異常検知',
      '物理配線工事のみ',
      '手作業の完全禁止'
    ],
    answers: [
      0,
      1
    ],
    explanation: '予測・検知は代表的活用です。'
  },
  {
    id: 'q021',
    chapter: '第1章 AIの基礎',
    topic: '評価指標',
    prompt: '分類モデル評価で一般的な指標はどれですか。',
    choices: [
      '適合率と再現率',
      'CPU温度',
      '画面解像度',
      'ファイルサイズのみ'
    ],
    answers: [
      0
    ],
    explanation: 'Precision/Recallは基本指標です。'
  },
  {
    id: 'q022',
    chapter: '第1章 AIの基礎',
    topic: '評価指標',
    prompt: '混同行列の用途として正しいのはどれですか。',
    choices: [
      '予測結果の正誤分布を確認する',
      '学習率を自動決定する',
      'GPU数を決める',
      '著作権を判定する'
    ],
    answers: [
      0
    ],
    explanation: '正解・誤判定の内訳を可視化します。'
  },
  {
    id: 'q023',
    chapter: '第1章 AIの基礎',
    topic: 'クラウドAI',
    prompt: 'クラウドAIサービスの利点として適切なのはどれですか。',
    choices: [
      '初期投資を抑えて利用開始できる',
      '必ずオンプレより高コスト',
      'セキュリティ不要',
      '契約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'スケーラビリティと初期コスト低減が利点です。'
  },
  {
    id: 'q024',
    chapter: '第1章 AIの基礎',
    topic: 'MLOps',
    prompt: 'MLOpsで重視される点として適切なものを2つ選んでください。',
    choices: [
      '再現性',
      '継続的なモデル監視',
      '手順の非文書化',
      'ログ削除'
    ],
    answers: [
      0,
      1
    ],
    explanation: '再現性と監視は運用の基本です。'
  },
  {
    id: 'q025',
    chapter: '第1章 AIの基礎',
    topic: '特徴量',
    prompt: '特徴量設計の目的として正しいのはどれですか。',
    choices: [
      'モデルが学習しやすい情報を与える',
      'データ量を必ず減らす',
      'ラベルを削除する',
      '評価を省略する'
    ],
    answers: [
      0
    ],
    explanation: '良い特徴量は性能向上に寄与します。'
  },
  {
    id: 'q026',
    chapter: '第1章 AIの基礎',
    topic: '交差検証',
    prompt: '交差検証の目的として適切なのはどれですか。',
    choices: [
      '汎化性能をより安定して推定する',
      '訓練データを増やさない',
      '過学習を促進する',
      'テストデータを訓練に混ぜる'
    ],
    answers: [
      0
    ],
    explanation: '分割評価で安定性を確認します。'
  },
  {
    id: 'q027',
    chapter: '第1章 AIの基礎',
    topic: 'AI倫理基礎',
    prompt: 'AI倫理で重視される原則として適切なものを2つ選んでください。',
    choices: [
      '透明性',
      '公平性',
      '無説明利用',
      '無制限監視'
    ],
    answers: [
      0,
      1
    ],
    explanation: '透明性と公平性は基本原則です。'
  },
  {
    id: 'q028',
    chapter: '第1章 AIの基礎',
    topic: 'データ分割',
    prompt: '機械学習で一般的なデータ分割として正しいのはどれですか。',
    choices: [
      '訓練・検証・テストに分ける',
      'すべて訓練に使う',
      'テストのみ使用',
      'ランダム分割不要'
    ],
    answers: [
      0
    ],
    explanation: '汎化評価のため分割が必要です。'
  },
  {
    id: 'q029',
    chapter: '第1章 AIの基礎',
    topic: 'AIと自動化',
    prompt: 'AI導入時に残すべき役割として適切なのはどれですか。',
    choices: [
      '最終判断と責任を担う人',
      'すべてAIに委ねる',
      '監査不要',
      '記録不要'
    ],
    answers: [
      0
    ],
    explanation: '人の関与と責任は重要です。'
  },
  {
    id: 'q030',
    chapter: '第1章 AIの基礎',
    topic: 'AIリテラシー',
    prompt: 'AIリテラシー向上の目的として正しいのはどれですか。',
    choices: [
      '適切な利用と限界理解',
      'AIを盲信する',
      '検証不要',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '限界理解は安全利用の前提です。'
  },
  {
    id: 'q031',
    chapter: '第1章 AIの基礎',
    topic: '学習率',
    prompt: '学習率が大きすぎる場合に起きやすい現象はどれですか。',
    choices: [
      '学習が不安定になる',
      '必ず最適解に収束',
      '過学習が必ず解消',
      'データ不足が解消'
    ],
    answers: [
      0
    ],
    explanation: '学習率は収束安定性に影響します。'
  },
  {
    id: 'q032',
    chapter: '第1章 AIの基礎',
    topic: '正則化',
    prompt: 'L2正則化の目的として適切なのはどれですか。',
    choices: [
      'モデル複雑度を抑え過学習を防ぐ',
      '学習を停止する',
      'データ削除',
      'ラベル追加不要化'
    ],
    answers: [
      0
    ],
    explanation: '正則化は汎化性能向上を狙います。'
  },
  {
    id: 'q033',
    chapter: '第1章 AIの基礎',
    topic: 'AIプロジェクト',
    prompt: 'AIプロジェクト開始前に必要なこととして適切なものを2つ選んでください。',
    choices: [
      '課題定義',
      '成功指標の設定',
      '全社一斉展開',
      '効果測定省略'
    ],
    answers: [
      0,
      1
    ],
    explanation: '課題とKPIの明確化が先です。'
  },
  {
    id: 'q034',
    chapter: '第1章 AIの基礎',
    topic: 'アンサンブル',
    prompt: 'アンサンブル学習の利点として正しいのはどれですか。',
    choices: [
      '複数モデル組合せで性能向上を狙える',
      '必ず単一モデルより遅くなるだけ',
      '説明性が必ず向上',
      'データ不要'
    ],
    answers: [
      0
    ],
    explanation: '複数モデルの組合せで精度向上が期待できます。'
  },
  {
    id: 'q035',
    chapter: '第1章 AIの基礎',
    topic: '転移学習',
    prompt: '転移学習の説明として適切なのはどれですか。',
    choices: [
      '既存モデルの知識を別タスクに活かす',
      '毎回ゼロから学習',
      'ラベル不要',
      '推論不可'
    ],
    answers: [
      0
    ],
    explanation: '学習済み知識の再利用が特徴です。'
  },
  {
    id: 'q036',
    chapter: '第1章 AIの基礎',
    topic: 'データ匿名化',
    prompt: '匿名化の目的として正しいのはどれですか。',
    choices: [
      '個人を特定しにくくする',
      'データ品質を下げる',
      '著作権を消す',
      '学習を禁止する'
    ],
    answers: [
      0
    ],
    explanation: 'プライバシー保護が目的です。'
  },
  {
    id: 'q037',
    chapter: '第1章 AIの基礎',
    topic: 'AIガバナンス基礎',
    prompt: '組織内AI利用で最初に整備すべきものとして適切なのはどれですか。',
    choices: [
      '利用ポリシーと責任体制',
      '無制限公開',
      'ログ削除',
      '教育省略'
    ],
    answers: [
      0
    ],
    explanation: 'ポリシーと責任体制が基盤です。'
  },
  {
    id: 'q038',
    chapter: '第1章 AIの基礎',
    topic: '評価データ',
    prompt: 'テストデータを訓練に混ぜると起きる問題はどれですか。',
    choices: [
      '性能を過大評価する',
      '必ず精度向上',
      '説明性向上',
      'バイアス解消'
    ],
    answers: [
      0
    ],
    explanation: 'データリークで評価が信頼できなくなります。'
  },
  {
    id: 'q039',
    chapter: '第1章 AIの基礎',
    topic: 'AI限界',
    prompt: 'AIの限界理解として適切なものを2つ選んでください。',
    choices: [
      '不確実な状況で誤る可能性',
      '学習データ依存',
      '常に100%正確',
      '更新不要'
    ],
    answers: [
      0,
      1
    ],
    explanation: '誤り可能性とデータ依存は重要な限界です。'
  },
  {
    id: 'q040',
    chapter: '第1章 AIの基礎',
    topic: 'ハイパーパラメータ',
    prompt: 'ハイパーパラメータ調整の目的として正しいのはどれですか。',
    choices: [
      'モデル性能を最適化する',
      'ラベルを自動生成する',
      '著作権確認',
      'GPU削除'
    ],
    answers: [
      0
    ],
    explanation: '学習設定の最適化が目的です。'
  },
  {
    id: 'q041',
    chapter: '第1章 AIの基礎',
    topic: 'データラベリング',
    prompt: 'ラベル品質管理で重要なのはどれですか。',
    choices: [
      'ラベル基準を統一する',
      '担当者ごとに基準を変える',
      '確認不要',
      '監査不要'
    ],
    answers: [
      0
    ],
    explanation: '基準統一で品質が安定します。'
  },
  {
    id: 'q042',
    chapter: '第1章 AIの基礎',
    topic: 'AIと人間協調',
    prompt: 'Human-in-the-loopの意味として適切なのはどれですか。',
    choices: [
      '人が判断や確認に関与する',
      '人を完全排除',
      'AIを使わない',
      '自動化禁止'
    ],
    answers: [
      0
    ],
    explanation: '人の確認を組み込む設計です。'
  },
  {
    id: 'q043',
    chapter: '第1章 AIの基礎',
    topic: 'モデル更新',
    prompt: '本番モデル更新時に必要なこととして適切なものを2つ選んでください。',
    choices: [
      '影響評価',
      'ロールバック手順',
      'ログ削除',
      '検証省略'
    ],
    answers: [
      0,
      1
    ],
    explanation: '影響評価と復旧手順が重要です。'
  },
  {
    id: 'q044',
    chapter: '第1章 AIの基礎',
    topic: 'AIリスク',
    prompt: 'AIリスク評価で確認すべき点として正しいのはどれですか。',
    choices: [
      '誤判定時の影響度',
      'UI色のみ',
      '社名表記',
      '印刷設定'
    ],
    answers: [
      0
    ],
    explanation: '影響度に応じた統制が必要です。'
  },
  {
    id: 'q045',
    chapter: '第1章 AIの基礎',
    topic: 'データガバナンス',
    prompt: 'データガバナンスの要素として適切なものを2つ選んでください。',
    choices: [
      'アクセス管理',
      '保存期間管理',
      '無制限共有',
      '暗号化禁止'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'アクセスと保存管理が基本です。'
  },
  {
    id: 'q046',
    chapter: '第1章 AIの基礎',
    topic: 'AI導入失敗要因',
    prompt: 'AI導入失敗の典型要因として適切なのはどれですか。',
    choices: [
      '課題が不明確なまま開始',
      '小さく検証する',
      'KPIを設定する',
      '現場ヒアリング'
    ],
    answers: [
      0
    ],
    explanation: '課題不明確は失敗要因です。'
  },
  {
    id: 'q047',
    chapter: '第1章 AIの基礎',
    topic: '再現性',
    prompt: '実験再現性確保のために重要なのはどれですか。',
    choices: [
      'データ・コード・設定を記録する',
      '記録を残さない',
      'バージョン管理不要',
      '乱数固定不要'
    ],
    answers: [
      0
    ],
    explanation: '記録とバージョン管理が再現性に必要です。'
  },
  {
    id: 'q048',
    chapter: '第1章 AIの基礎',
    topic: 'AIと統計',
    prompt: '統計と機械学習の関係として適切なのはどれですか。',
    choices: [
      '機械学習は統計的手法を含む',
      '完全に無関係',
      '統計は不要',
      '推論不可'
    ],
    answers: [
      0
    ],
    explanation: '機械学習は統計的アプローチを活用します。'
  },
  {
    id: 'q049',
    chapter: '第1章 AIの基礎',
    topic: '特徴選択',
    prompt: '特徴選択の目的として正しいのはどれですか。',
    choices: [
      '不要な変数を減らし性能・効率を改善',
      'データ削除',
      'ラベル削除',
      '評価省略'
    ],
    answers: [
      0
    ],
    explanation: '次元削減と性能改善が目的です。'
  },
  {
    id: 'q050',
    chapter: '第1章 AIの基礎',
    topic: 'AI教育',
    prompt: '組織内AI教育で重要な内容として適切なものを2つ選んでください。',
    choices: [
      '限界とリスク',
      '安全な入力情報',
      '社外秘情報入力推奨',
      '無検証利用'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'リスク理解と安全入力が重要です。'
  },
  {
    id: 'q051',
    chapter: '第1章 AIの基礎',
    topic: '推論と学習',
    prompt: '推論（Inference）の説明として正しいのはどれですか。',
    choices: [
      '学習済みモデルで予測を行う',
      'モデルを新規学習する',
      'データ収集のみ',
      'ラベル作成'
    ],
    answers: [
      0
    ],
    explanation: '推論は学習後の利用フェーズです。'
  },
  {
    id: 'q052',
    chapter: '第1章 AIの基礎',
    topic: 'バッチ学習',
    prompt: 'バッチ学習の特徴として適切なのはどれですか。',
    choices: [
      '一定期間のデータをまとめて学習する',
      '1件ごとに即時更新必須',
      '学習不要',
      '推論不可'
    ],
    answers: [
      0
    ],
    explanation: 'まとめて学習する方式です。'
  },
  {
    id: 'q053',
    chapter: '第1章 AIの基礎',
    topic: 'オンライン学習',
    prompt: 'オンライン学習の用途として近いのはどれですか。',
    choices: [
      'データが継続的に増える環境',
      '一度きりの固定データのみ',
      'ラベル不要',
      '推論禁止'
    ],
    answers: [
      0
    ],
    explanation: 'ストリーミング更新に向きます。'
  },
  {
    id: 'q054',
    chapter: '第1章 AIの基礎',
    topic: 'AI監査',
    prompt: 'AI監査で確認する項目として適切なものを2つ選んでください。',
    choices: [
      'データ由来',
      '評価結果',
      'ログ削除',
      '責任者不在'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'データと評価の妥当性確認が重要です。'
  },
  {
    id: 'q055',
    chapter: '第1章 AIの基礎',
    topic: '精度と再現率',
    prompt: '再現率（Recall）が重要になる状況の例はどれですか。',
    choices: [
      '見逃しを減らしたい異常検知',
      '誤検知だけ重要',
      '表示速度のみ',
      'UI改善'
    ],
    answers: [
      0
    ],
    explanation: '見逃しコストが高い場面で重要です。'
  },
  {
    id: 'q056',
    chapter: '第1章 AIの基礎',
    topic: '適合率',
    prompt: '適合率（Precision）が重要になる状況の例はどれですか。',
    choices: [
      '誤検知コストが高い判定',
      '見逃しのみ重要',
      '学習率調整',
      'GPU選定'
    ],
    answers: [
      0
    ],
    explanation: '誤検知のコストが高い場面で重要です。'
  },
  {
    id: 'q057',
    chapter: '第1章 AIの基礎',
    topic: 'AI倫理委員会',
    prompt: '倫理委員会設置の目的として適切なのはどれですか。',
    choices: [
      '高リスク利用の審議',
      '開発停止',
      'ログ削除',
      '無制限利用'
    ],
    answers: [
      0
    ],
    explanation: '高リスク案件の審議が目的です。'
  },
  {
    id: 'q058',
    chapter: '第1章 AIの基礎',
    topic: 'データ最小化',
    prompt: 'データ最小化原則の意味として正しいのはどれですか。',
    choices: [
      '必要最小限のデータだけ扱う',
      '可能な限り全データ収集',
      '保存期間無期限',
      '匿名化不要'
    ],
    answers: [
      0
    ],
    explanation: '必要最小限の収集・利用が原則です。'
  },
  {
    id: 'q059',
    chapter: '第1章 AIの基礎',
    topic: 'AIと就労',
    prompt: 'AI導入と人材の関係として適切なものを2つ選んでください。',
    choices: [
      '業務再設計',
      '再教育',
      '人員削減のみ目的',
      '説明不要'
    ],
    answers: [
      0,
      1
    ],
    explanation: '業務再設計と再教育が重要です。'
  },
  {
    id: 'q060',
    chapter: '第1章 AIの基礎',
    topic: 'ベンチマーク',
    prompt: 'ベンチマークデータセットの用途として正しいのはどれですか。',
    choices: [
      'モデル性能を比較評価する',
      '著作権登録',
      '個人情報公開',
      '学習禁止'
    ],
    answers: [
      0
    ],
    explanation: '標準データで比較評価します。'
  },
  {
    id: 'q061',
    chapter: '第2章 生成AI',
    topic: '生成AI定義',
    prompt: '生成AIの説明として最も適切なのはどれですか。',
    choices: [
      '新しいコンテンツを生成するAI',
      'データ保存のみ',
      '電源管理',
      'ルーティング専用'
    ],
    answers: [
      0
    ],
    explanation: 'テキスト・画像などを新規生成します。'
  },
  {
    id: 'q062',
    chapter: '第2章 生成AI',
    topic: 'LLM',
    prompt: '大規模言語モデル（LLM）の特徴として正しいのはどれですか。',
    choices: [
      '大量テキストで学習し自然言語処理を行う',
      '画像のみ処理',
      '必ず小規模',
      'ルール固定のみ'
    ],
    answers: [
      0
    ],
    explanation: '大規模テキスト学習が特徴です。'
  },
  {
    id: 'q063',
    chapter: '第2章 生成AI',
    topic: 'Transformer',
    prompt: 'Transformerの重要要素として適切なのはどれですか。',
    choices: [
      'Self-Attention',
      '手作業ルールのみ',
      'GPU不要',
      '学習不可'
    ],
    answers: [
      0
    ],
    explanation: 'Attention機構が中核です。'
  },
  {
    id: 'q064',
    chapter: '第2章 生成AI',
    topic: 'トークン',
    prompt: 'トークンの説明として正しいのはどれですか。',
    choices: [
      'モデルが処理するテキストの最小単位',
      '画像ピクセルのみ',
      'CPUコア数',
      'ファイル名'
    ],
    answers: [
      0
    ],
    explanation: 'トークンは言語モデルの処理単位です。'
  },
  {
    id: 'q065',
    chapter: '第2章 生成AI',
    topic: 'コンテキスト長',
    prompt: 'コンテキストウィンドウが長い利点として適切なのはどれですか。',
    choices: [
      'より多くの文脈を一度に扱える',
      '必ず精度低下',
      '学習不要',
      'コストゼロ'
    ],
    answers: [
      0
    ],
    explanation: '長い文脈を保持できます。'
  },
  {
    id: 'q066',
    chapter: '第2章 生成AI',
    topic: 'ChatGPT',
    prompt: 'ChatGPTの位置づけとして適切なのはどれですか。',
    choices: [
      '対話型生成AIサービス',
      '画像編集専用',
      'DB管理ツール',
      'OS'
    ],
    answers: [
      0
    ],
    explanation: '対話型LLMサービスです。'
  },
  {
    id: 'q067',
    chapter: '第2章 生成AI',
    topic: 'GPT系モデル',
    prompt: 'GPT-o1系モデルの特徴として近い説明はどれですか。',
    choices: [
      '推論を強化したモデル系列',
      '画像生成専用',
      '音声のみ',
      'ルールエンジン'
    ],
    answers: [
      0
    ],
    explanation: '推論強化が特徴です。'
  },
  {
    id: 'q068',
    chapter: '第2章 生成AI',
    topic: '主要モデル',
    prompt: '主要生成AIサービスとして適切なものを2つ選んでください。',
    choices: [
      'Gemini',
      'Claude',
      'SMTP',
      'FTP'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'GeminiとClaudeは代表的服务です。'
  },
  {
    id: 'q069',
    chapter: '第2章 生成AI',
    topic: 'Copilot',
    prompt: 'Microsoft Copilotの用途として適切なのはどれですか。',
    choices: [
      '業務アプリや開発支援',
      '物理配線',
      '電源管理',
      'DNS設定のみ'
    ],
    answers: [
      0
    ],
    explanation: 'Office/開発支援が中心です。'
  },
  {
    id: 'q070',
    chapter: '第2章 生成AI',
    topic: 'プロンプト',
    prompt: '良いプロンプトの条件として適切なものを2つ選んでください。',
    choices: [
      '目的を明確にする',
      '制約条件を示す',
      '情報を隠す',
      '曖昧にする'
    ],
    answers: [
      0,
      1
    ],
    explanation: '目的と制約の明示が重要です。'
  },
  {
    id: 'q071',
    chapter: '第2章 生成AI',
    topic: 'Zero-shot',
    prompt: 'Zero-shotプロンプティングの説明として正しいのはどれですか。',
    choices: [
      '例示なしで指示する',
      '大量例示必須',
      'ファインチューニング必須',
      'RAG必須'
    ],
    answers: [
      0
    ],
    explanation: '例なしでタスクを指示します。'
  },
  {
    id: 'q072',
    chapter: '第2章 生成AI',
    topic: 'Few-shot',
    prompt: 'Few-shotプロンプティングの説明として正しいのはどれですか。',
    choices: [
      '少数の例を示して出力形式を誘導する',
      '例示禁止',
      '学習率調整',
      'GPU増設'
    ],
    answers: [
      0
    ],
    explanation: '少数例示で誘導します。'
  },
  {
    id: 'q073',
    chapter: '第2章 生成AI',
    topic: 'CoT',
    prompt: 'Chain-of-Thoughtの目的として適切なのはどれですか。',
    choices: [
      '段階的推論で回答精度を高める',
      '回答を短くする',
      '学習停止',
      'ログ削除'
    ],
    answers: [
      0
    ],
    explanation: '思考過程を促す技法です。'
  },
  {
    id: 'q074',
    chapter: '第2章 生成AI',
    topic: 'ハルシネーション',
    prompt: 'ハルシネーションの説明として正しいのはどれですか。',
    choices: [
      'もっともらしい誤情報を生成する現象',
      '必ず正確',
      '学習不可',
      '推論禁止'
    ],
    answers: [
      0
    ],
    explanation: '誤情報生成リスクです。'
  },
  {
    id: 'q075',
    chapter: '第2章 生成AI',
    topic: 'ハルシネーション対策',
    prompt: 'ハルシネーション対策として適切なものを2つ選んでください。',
    choices: [
      '根拠確認',
      '参照情報の提示',
      '無検証利用',
      '盲信'
    ],
    answers: [
      0,
      1
    ],
    explanation: '人による確認と参照提示が有効です。'
  },
  {
    id: 'q076',
    chapter: '第2章 生成AI',
    topic: 'Temperature',
    prompt: 'Temperatureを上げた場合の傾向として正しいのはどれですか。',
    choices: [
      '出力の多様性が増える',
      '必ず正確になる',
      '停止する',
      '学習する'
    ],
    answers: [
      0
    ],
    explanation: '高温度はランダム性が増します。'
  },
  {
    id: 'q077',
    chapter: '第2章 生成AI',
    topic: 'Top-p',
    prompt: 'Top-pサンプリングの目的として適切なのはどれですか。',
    choices: [
      '確率質量に基づき候補を制限する',
      'GPU数を決める',
      '著作権判定',
      'DB索引'
    ],
    answers: [
      0
    ],
    explanation: '出力候補を確率で制限します。'
  },
  {
    id: 'q078',
    chapter: '第2章 生成AI',
    topic: 'マルチモーダル',
    prompt: 'マルチモーダルAIの説明として正しいのはどれですか。',
    choices: [
      'テキストと画像など複数形式を扱う',
      'テキストのみ',
      '数値のみ',
      '音声不可'
    ],
    answers: [
      0
    ],
    explanation: '複数モダリティを扱います。'
  },
  {
    id: 'q079',
    chapter: '第2章 生成AI',
    topic: 'Sora',
    prompt: 'Soraに関する説明として近いのはどれですか。',
    choices: [
      '動画生成に関する生成AI技術',
      'メール送信',
      'DNS',
      'ルーター'
    ],
    answers: [
      0
    ],
    explanation: '動画生成関連です。'
  },
  {
    id: 'q080',
    chapter: '第2章 生成AI',
    topic: '画像生成',
    prompt: '拡散モデルの用途として適切なのはどれですか。',
    choices: [
      '画像生成',
      'SQL最適化',
      'DNS',
      'VPN'
    ],
    answers: [
      0
    ],
    explanation: '拡散モデルは画像生成で使われます。'
  },
  {
    id: 'q081',
    chapter: '第2章 生成AI',
    topic: 'Role Prompt',
    prompt: 'Role Promptに関する説明として最も適切なのはどれですか。',
    choices: [
      'Role Promptの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'Role Promptは試験範囲の重要キーワードです。'
  },
  {
    id: 'q082',
    chapter: '第2章 生成AI',
    topic: 'Role Prompt',
    prompt: 'Role Promptの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'Role Promptは目的とリスク理解が前提です。'
  },
  {
    id: 'q083',
    chapter: '第2章 生成AI',
    topic: 'Role Prompt',
    prompt: 'Role Promptの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'Role Promptには限界があります。'
  },
  {
    id: 'q084',
    chapter: '第2章 生成AI',
    topic: 'Role Prompt',
    prompt: 'Role Promptの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'Role Promptは用語と場面理解が重要です。'
  },
  {
    id: 'q085',
    chapter: '第2章 生成AI',
    topic: 'System Prompt',
    prompt: 'System Promptに関する説明として最も適切なのはどれですか。',
    choices: [
      'System Promptの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'System Promptは試験範囲の重要キーワードです。'
  },
  {
    id: 'q086',
    chapter: '第2章 生成AI',
    topic: 'System Prompt',
    prompt: 'System Promptの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'System Promptは目的とリスク理解が前提です。'
  },
  {
    id: 'q087',
    chapter: '第2章 生成AI',
    topic: 'System Prompt',
    prompt: 'System Promptの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'System Promptには限界があります。'
  },
  {
    id: 'q088',
    chapter: '第2章 生成AI',
    topic: 'System Prompt',
    prompt: 'System Promptの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'System Promptは用語と場面理解が重要です。'
  },
  {
    id: 'q089',
    chapter: '第2章 生成AI',
    topic: '出力形式指定',
    prompt: '出力形式指定に関する説明として最も適切なのはどれですか。',
    choices: [
      '出力形式指定の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '出力形式指定は試験範囲の重要キーワードです。'
  },
  {
    id: 'q090',
    chapter: '第2章 生成AI',
    topic: '出力形式指定',
    prompt: '出力形式指定の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '出力形式指定は目的とリスク理解が前提です。'
  },
  {
    id: 'q091',
    chapter: '第2章 生成AI',
    topic: '出力形式指定',
    prompt: '出力形式指定の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '出力形式指定には限界があります。'
  },
  {
    id: 'q092',
    chapter: '第2章 生成AI',
    topic: '出力形式指定',
    prompt: '出力形式指定の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '出力形式指定は用語と場面理解が重要です。'
  },
  {
    id: 'q093',
    chapter: '第2章 生成AI',
    topic: '制約プロンプト',
    prompt: '制約プロンプトに関する説明として最も適切なのはどれですか。',
    choices: [
      '制約プロンプトの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '制約プロンプトは試験範囲の重要キーワードです。'
  },
  {
    id: 'q094',
    chapter: '第2章 生成AI',
    topic: '制約プロンプト',
    prompt: '制約プロンプトの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '制約プロンプトは目的とリスク理解が前提です。'
  },
  {
    id: 'q095',
    chapter: '第2章 生成AI',
    topic: '制約プロンプト',
    prompt: '制約プロンプトの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '制約プロンプトには限界があります。'
  },
  {
    id: 'q096',
    chapter: '第2章 生成AI',
    topic: '制約プロンプト',
    prompt: '制約プロンプトの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '制約プロンプトは用語と場面理解が重要です。'
  },
  {
    id: 'q097',
    chapter: '第2章 生成AI',
    topic: '評価プロンプト',
    prompt: '評価プロンプトに関する説明として最も適切なのはどれですか。',
    choices: [
      '評価プロンプトの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '評価プロンプトは試験範囲の重要キーワードです。'
  },
  {
    id: 'q098',
    chapter: '第2章 生成AI',
    topic: '評価プロンプト',
    prompt: '評価プロンプトの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '評価プロンプトは目的とリスク理解が前提です。'
  },
  {
    id: 'q099',
    chapter: '第2章 生成AI',
    topic: '評価プロンプト',
    prompt: '評価プロンプトの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '評価プロンプトには限界があります。'
  },
  {
    id: 'q100',
    chapter: '第2章 生成AI',
    topic: '評価プロンプト',
    prompt: '評価プロンプトの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '評価プロンプトは用語と場面理解が重要です。'
  },
  {
    id: 'q101',
    chapter: '第2章 生成AI',
    topic: '反復改善',
    prompt: '反復改善に関する説明として最も適切なのはどれですか。',
    choices: [
      '反復改善の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '反復改善は試験範囲の重要キーワードです。'
  },
  {
    id: 'q102',
    chapter: '第2章 生成AI',
    topic: '反復改善',
    prompt: '反復改善の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '反復改善は目的とリスク理解が前提です。'
  },
  {
    id: 'q103',
    chapter: '第2章 生成AI',
    topic: '反復改善',
    prompt: '反復改善の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '反復改善には限界があります。'
  },
  {
    id: 'q104',
    chapter: '第2章 生成AI',
    topic: '反復改善',
    prompt: '反復改善の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '反復改善は用語と場面理解が重要です。'
  },
  {
    id: 'q105',
    chapter: '第2章 生成AI',
    topic: 'モデル選定',
    prompt: 'モデル選定に関する説明として最も適切なのはどれですか。',
    choices: [
      'モデル選定の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'モデル選定は試験範囲の重要キーワードです。'
  },
  {
    id: 'q106',
    chapter: '第2章 生成AI',
    topic: 'モデル選定',
    prompt: 'モデル選定の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'モデル選定は目的とリスク理解が前提です。'
  },
  {
    id: 'q107',
    chapter: '第2章 生成AI',
    topic: 'モデル選定',
    prompt: 'モデル選定の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'モデル選定には限界があります。'
  },
  {
    id: 'q108',
    chapter: '第2章 生成AI',
    topic: 'モデル選定',
    prompt: 'モデル選定の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'モデル選定は用語と場面理解が重要です。'
  },
  {
    id: 'q109',
    chapter: '第2章 生成AI',
    topic: 'API利用',
    prompt: 'API利用に関する説明として最も適切なのはどれですか。',
    choices: [
      'API利用の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'API利用は試験範囲の重要キーワードです。'
  },
  {
    id: 'q110',
    chapter: '第2章 生成AI',
    topic: 'API利用',
    prompt: 'API利用の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'API利用は目的とリスク理解が前提です。'
  },
  {
    id: 'q111',
    chapter: '第2章 生成AI',
    topic: 'API利用',
    prompt: 'API利用の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'API利用には限界があります。'
  },
  {
    id: 'q112',
    chapter: '第2章 生成AI',
    topic: 'API利用',
    prompt: 'API利用の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'API利用は用語と場面理解が重要です。'
  },
  {
    id: 'q113',
    chapter: '第2章 生成AI',
    topic: 'コスト管理',
    prompt: 'コスト管理に関する説明として最も適切なのはどれですか。',
    choices: [
      'コスト管理の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'コスト管理は試験範囲の重要キーワードです。'
  },
  {
    id: 'q114',
    chapter: '第2章 生成AI',
    topic: 'コスト管理',
    prompt: 'コスト管理の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'コスト管理は目的とリスク理解が前提です。'
  },
  {
    id: 'q115',
    chapter: '第2章 生成AI',
    topic: 'コスト管理',
    prompt: 'コスト管理の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'コスト管理には限界があります。'
  },
  {
    id: 'q116',
    chapter: '第2章 生成AI',
    topic: 'コスト管理',
    prompt: 'コスト管理の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'コスト管理は用語と場面理解が重要です。'
  },
  {
    id: 'q117',
    chapter: '第2章 生成AI',
    topic: 'セキュリティ入力',
    prompt: 'セキュリティ入力に関する説明として最も適切なのはどれですか。',
    choices: [
      'セキュリティ入力の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'セキュリティ入力は試験範囲の重要キーワードです。'
  },
  {
    id: 'q118',
    chapter: '第2章 生成AI',
    topic: 'セキュリティ入力',
    prompt: 'セキュリティ入力の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'セキュリティ入力は目的とリスク理解が前提です。'
  },
  {
    id: 'q119',
    chapter: '第2章 生成AI',
    topic: 'セキュリティ入力',
    prompt: 'セキュリティ入力の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'セキュリティ入力には限界があります。'
  },
  {
    id: 'q120',
    chapter: '第2章 生成AI',
    topic: 'セキュリティ入力',
    prompt: 'セキュリティ入力の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'セキュリティ入力は用語と場面理解が重要です。'
  },
  {
    id: 'q121',
    chapter: '第3章 生成AIの技術',
    topic: 'RAG',
    prompt: 'RAGに関する説明として最も適切なのはどれですか。',
    choices: [
      'RAGの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'RAGは試験範囲の重要キーワードです。'
  },
  {
    id: 'q122',
    chapter: '第3章 生成AIの技術',
    topic: 'RAG',
    prompt: 'RAGの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'RAGは目的とリスク理解が前提です。'
  },
  {
    id: 'q123',
    chapter: '第3章 生成AIの技術',
    topic: 'RAG',
    prompt: 'RAGの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'RAGには限界があります。'
  },
  {
    id: 'q124',
    chapter: '第3章 生成AIの技術',
    topic: 'RAG',
    prompt: 'RAGの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'RAGは用語と場面理解が重要です。'
  },
  {
    id: 'q125',
    chapter: '第3章 生成AIの技術',
    topic: 'RAG',
    prompt: 'RAGと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q126',
    chapter: '第3章 生成AIの技術',
    topic: 'RAG',
    prompt: 'RAGの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q127',
    chapter: '第3章 生成AIの技術',
    topic: 'チャンク',
    prompt: 'チャンクに関する説明として最も適切なのはどれですか。',
    choices: [
      'チャンクの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'チャンクは試験範囲の重要キーワードです。'
  },
  {
    id: 'q128',
    chapter: '第3章 生成AIの技術',
    topic: 'チャンク',
    prompt: 'チャンクの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'チャンクは目的とリスク理解が前提です。'
  },
  {
    id: 'q129',
    chapter: '第3章 生成AIの技術',
    topic: 'チャンク',
    prompt: 'チャンクの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'チャンクには限界があります。'
  },
  {
    id: 'q130',
    chapter: '第3章 生成AIの技術',
    topic: 'チャンク',
    prompt: 'チャンクの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'チャンクは用語と場面理解が重要です。'
  },
  {
    id: 'q131',
    chapter: '第3章 生成AIの技術',
    topic: 'チャンク',
    prompt: 'チャンクと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q132',
    chapter: '第3章 生成AIの技術',
    topic: 'チャンク',
    prompt: 'チャンクの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q133',
    chapter: '第3章 生成AIの技術',
    topic: 'ベクトルDB',
    prompt: 'ベクトルDBに関する説明として最も適切なのはどれですか。',
    choices: [
      'ベクトルDBの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'ベクトルDBは試験範囲の重要キーワードです。'
  },
  {
    id: 'q134',
    chapter: '第3章 生成AIの技術',
    topic: 'ベクトルDB',
    prompt: 'ベクトルDBの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ベクトルDBは目的とリスク理解が前提です。'
  },
  {
    id: 'q135',
    chapter: '第3章 生成AIの技術',
    topic: 'ベクトルDB',
    prompt: 'ベクトルDBの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ベクトルDBには限界があります。'
  },
  {
    id: 'q136',
    chapter: '第3章 生成AIの技術',
    topic: 'ベクトルDB',
    prompt: 'ベクトルDBの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'ベクトルDBは用語と場面理解が重要です。'
  },
  {
    id: 'q137',
    chapter: '第3章 生成AIの技術',
    topic: 'ベクトルDB',
    prompt: 'ベクトルDBと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q138',
    chapter: '第3章 生成AIの技術',
    topic: 'ベクトルDB',
    prompt: 'ベクトルDBの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q139',
    chapter: '第3章 生成AIの技術',
    topic: 'Embedding',
    prompt: 'Embeddingに関する説明として最も適切なのはどれですか。',
    choices: [
      'Embeddingの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'Embeddingは試験範囲の重要キーワードです。'
  },
  {
    id: 'q140',
    chapter: '第3章 生成AIの技術',
    topic: 'Embedding',
    prompt: 'Embeddingの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'Embeddingは目的とリスク理解が前提です。'
  },
  {
    id: 'q141',
    chapter: '第3章 生成AIの技術',
    topic: 'Embedding',
    prompt: 'Embeddingの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'Embeddingには限界があります。'
  },
  {
    id: 'q142',
    chapter: '第3章 生成AIの技術',
    topic: 'Embedding',
    prompt: 'Embeddingの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'Embeddingは用語と場面理解が重要です。'
  },
  {
    id: 'q143',
    chapter: '第3章 生成AIの技術',
    topic: 'Embedding',
    prompt: 'Embeddingと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q144',
    chapter: '第3章 生成AIの技術',
    topic: 'Embedding',
    prompt: 'Embeddingの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q145',
    chapter: '第3章 生成AIの技術',
    topic: 'セマンティック検索',
    prompt: 'セマンティック検索に関する説明として最も適切なのはどれですか。',
    choices: [
      'セマンティック検索の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'セマンティック検索は試験範囲の重要キーワードです。'
  },
  {
    id: 'q146',
    chapter: '第3章 生成AIの技術',
    topic: 'セマンティック検索',
    prompt: 'セマンティック検索の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'セマンティック検索は目的とリスク理解が前提です。'
  },
  {
    id: 'q147',
    chapter: '第3章 生成AIの技術',
    topic: 'セマンティック検索',
    prompt: 'セマンティック検索の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'セマンティック検索には限界があります。'
  },
  {
    id: 'q148',
    chapter: '第3章 生成AIの技術',
    topic: 'セマンティック検索',
    prompt: 'セマンティック検索の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'セマンティック検索は用語と場面理解が重要です。'
  },
  {
    id: 'q149',
    chapter: '第3章 生成AIの技術',
    topic: 'セマンティック検索',
    prompt: 'セマンティック検索と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q150',
    chapter: '第3章 生成AIの技術',
    topic: 'セマンティック検索',
    prompt: 'セマンティック検索の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q151',
    chapter: '第3章 生成AIの技術',
    topic: 'AIエージェント',
    prompt: 'AIエージェントに関する説明として最も適切なのはどれですか。',
    choices: [
      'AIエージェントの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'AIエージェントは試験範囲の重要キーワードです。'
  },
  {
    id: 'q152',
    chapter: '第3章 生成AIの技術',
    topic: 'AIエージェント',
    prompt: 'AIエージェントの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'AIエージェントは目的とリスク理解が前提です。'
  },
  {
    id: 'q153',
    chapter: '第3章 生成AIの技術',
    topic: 'AIエージェント',
    prompt: 'AIエージェントの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'AIエージェントには限界があります。'
  },
  {
    id: 'q154',
    chapter: '第3章 生成AIの技術',
    topic: 'AIエージェント',
    prompt: 'AIエージェントの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'AIエージェントは用語と場面理解が重要です。'
  },
  {
    id: 'q155',
    chapter: '第3章 生成AIの技術',
    topic: 'AIエージェント',
    prompt: 'AIエージェントと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q156',
    chapter: '第3章 生成AIの技術',
    topic: 'AIエージェント',
    prompt: 'AIエージェントの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q157',
    chapter: '第3章 生成AIの技術',
    topic: 'MCP',
    prompt: 'MCPに関する説明として最も適切なのはどれですか。',
    choices: [
      'MCPの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'MCPは試験範囲の重要キーワードです。'
  },
  {
    id: 'q158',
    chapter: '第3章 生成AIの技術',
    topic: 'MCP',
    prompt: 'MCPの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'MCPは目的とリスク理解が前提です。'
  },
  {
    id: 'q159',
    chapter: '第3章 生成AIの技術',
    topic: 'MCP',
    prompt: 'MCPの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'MCPには限界があります。'
  },
  {
    id: 'q160',
    chapter: '第3章 生成AIの技術',
    topic: 'MCP',
    prompt: 'MCPの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'MCPは用語と場面理解が重要です。'
  },
  {
    id: 'q161',
    chapter: '第3章 生成AIの技術',
    topic: 'MCP',
    prompt: 'MCPと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q162',
    chapter: '第3章 生成AIの技術',
    topic: 'MCP',
    prompt: 'MCPの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q163',
    chapter: '第3章 生成AIの技術',
    topic: 'Function Calling',
    prompt: 'Function Callingに関する説明として最も適切なのはどれですか。',
    choices: [
      'Function Callingの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'Function Callingは試験範囲の重要キーワードです。'
  },
  {
    id: 'q164',
    chapter: '第3章 生成AIの技術',
    topic: 'Function Calling',
    prompt: 'Function Callingの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'Function Callingは目的とリスク理解が前提です。'
  },
  {
    id: 'q165',
    chapter: '第3章 生成AIの技術',
    topic: 'Function Calling',
    prompt: 'Function Callingの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'Function Callingには限界があります。'
  },
  {
    id: 'q166',
    chapter: '第3章 生成AIの技術',
    topic: 'Function Calling',
    prompt: 'Function Callingの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'Function Callingは用語と場面理解が重要です。'
  },
  {
    id: 'q167',
    chapter: '第3章 生成AIの技術',
    topic: 'Function Calling',
    prompt: 'Function Callingと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q168',
    chapter: '第3章 生成AIの技術',
    topic: 'Function Calling',
    prompt: 'Function Callingの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q169',
    chapter: '第3章 生成AIの技術',
    topic: 'Prompt Injection',
    prompt: 'Prompt Injectionに関する説明として最も適切なのはどれですか。',
    choices: [
      'Prompt Injectionの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'Prompt Injectionは試験範囲の重要キーワードです。'
  },
  {
    id: 'q170',
    chapter: '第3章 生成AIの技術',
    topic: 'Prompt Injection',
    prompt: 'Prompt Injectionの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'Prompt Injectionは目的とリスク理解が前提です。'
  },
  {
    id: 'q171',
    chapter: '第3章 生成AIの技術',
    topic: 'Prompt Injection',
    prompt: 'Prompt Injectionの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'Prompt Injectionには限界があります。'
  },
  {
    id: 'q172',
    chapter: '第3章 生成AIの技術',
    topic: 'Prompt Injection',
    prompt: 'Prompt Injectionの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'Prompt Injectionは用語と場面理解が重要です。'
  },
  {
    id: 'q173',
    chapter: '第3章 生成AIの技術',
    topic: 'Prompt Injection',
    prompt: 'Prompt Injectionと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q174',
    chapter: '第3章 生成AIの技術',
    topic: 'Prompt Injection',
    prompt: 'Prompt Injectionの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q175',
    chapter: '第3章 生成AIの技術',
    topic: '評価指標',
    prompt: '評価指標に関する説明として最も適切なのはどれですか。',
    choices: [
      '評価指標の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '評価指標は試験範囲の重要キーワードです。'
  },
  {
    id: 'q176',
    chapter: '第3章 生成AIの技術',
    topic: '評価指標',
    prompt: '評価指標の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '評価指標は目的とリスク理解が前提です。'
  },
  {
    id: 'q177',
    chapter: '第3章 生成AIの技術',
    topic: '評価指標',
    prompt: '評価指標の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '評価指標には限界があります。'
  },
  {
    id: 'q178',
    chapter: '第3章 生成AIの技術',
    topic: '評価指標',
    prompt: '評価指標の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '評価指標は用語と場面理解が重要です。'
  },
  {
    id: 'q179',
    chapter: '第3章 生成AIの技術',
    topic: '評価指標',
    prompt: '評価指標と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q180',
    chapter: '第3章 生成AIの技術',
    topic: '評価指標',
    prompt: '評価指標の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q181',
    chapter: '第4章 法律と倫理',
    topic: '個人情報',
    prompt: '個人情報に関する説明として最も適切なのはどれですか。',
    choices: [
      '個人情報の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '個人情報は試験範囲の重要キーワードです。'
  },
  {
    id: 'q182',
    chapter: '第4章 法律と倫理',
    topic: '個人情報',
    prompt: '個人情報の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '個人情報は目的とリスク理解が前提です。'
  },
  {
    id: 'q183',
    chapter: '第4章 法律と倫理',
    topic: '個人情報',
    prompt: '個人情報の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '個人情報には限界があります。'
  },
  {
    id: 'q184',
    chapter: '第4章 法律と倫理',
    topic: '個人情報',
    prompt: '個人情報の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '個人情報は用語と場面理解が重要です。'
  },
  {
    id: 'q185',
    chapter: '第4章 法律と倫理',
    topic: '個人情報',
    prompt: '個人情報と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q186',
    chapter: '第4章 法律と倫理',
    topic: '個人情報',
    prompt: '個人情報の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q187',
    chapter: '第4章 法律と倫理',
    topic: '著作権',
    prompt: '著作権に関する説明として最も適切なのはどれですか。',
    choices: [
      '著作権の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '著作権は試験範囲の重要キーワードです。'
  },
  {
    id: 'q188',
    chapter: '第4章 法律と倫理',
    topic: '著作権',
    prompt: '著作権の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '著作権は目的とリスク理解が前提です。'
  },
  {
    id: 'q189',
    chapter: '第4章 法律と倫理',
    topic: '著作権',
    prompt: '著作権の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '著作権には限界があります。'
  },
  {
    id: 'q190',
    chapter: '第4章 法律と倫理',
    topic: '著作権',
    prompt: '著作権の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '著作権は用語と場面理解が重要です。'
  },
  {
    id: 'q191',
    chapter: '第4章 法律と倫理',
    topic: '著作権',
    prompt: '著作権と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q192',
    chapter: '第4章 法律と倫理',
    topic: '著作権',
    prompt: '著作権の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q193',
    chapter: '第4章 法律と倫理',
    topic: 'AI新法',
    prompt: 'AI新法に関する説明として最も適切なのはどれですか。',
    choices: [
      'AI新法の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'AI新法は試験範囲の重要キーワードです。'
  },
  {
    id: 'q194',
    chapter: '第4章 法律と倫理',
    topic: 'AI新法',
    prompt: 'AI新法の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'AI新法は目的とリスク理解が前提です。'
  },
  {
    id: 'q195',
    chapter: '第4章 法律と倫理',
    topic: 'AI新法',
    prompt: 'AI新法の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'AI新法には限界があります。'
  },
  {
    id: 'q196',
    chapter: '第4章 法律と倫理',
    topic: 'AI新法',
    prompt: 'AI新法の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'AI新法は用語と場面理解が重要です。'
  },
  {
    id: 'q197',
    chapter: '第4章 法律と倫理',
    topic: 'AI新法',
    prompt: 'AI新法と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q198',
    chapter: '第4章 法律と倫理',
    topic: 'AI新法',
    prompt: 'AI新法の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q199',
    chapter: '第4章 法律と倫理',
    topic: 'ガイドライン',
    prompt: 'ガイドラインに関する説明として最も適切なのはどれですか。',
    choices: [
      'ガイドラインの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'ガイドラインは試験範囲の重要キーワードです。'
  },
  {
    id: 'q200',
    chapter: '第4章 法律と倫理',
    topic: 'ガイドライン',
    prompt: 'ガイドラインの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ガイドラインは目的とリスク理解が前提です。'
  },
  {
    id: 'q201',
    chapter: '第4章 法律と倫理',
    topic: 'ガイドライン',
    prompt: 'ガイドラインの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ガイドラインには限界があります。'
  },
  {
    id: 'q202',
    chapter: '第4章 法律と倫理',
    topic: 'ガイドライン',
    prompt: 'ガイドラインの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'ガイドラインは用語と場面理解が重要です。'
  },
  {
    id: 'q203',
    chapter: '第4章 法律と倫理',
    topic: 'ガイドライン',
    prompt: 'ガイドラインと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q204',
    chapter: '第4章 法律と倫理',
    topic: 'ガイドライン',
    prompt: 'ガイドラインの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q205',
    chapter: '第4章 法律と倫理',
    topic: 'ガバナンス',
    prompt: 'ガバナンスに関する説明として最も適切なのはどれですか。',
    choices: [
      'ガバナンスの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'ガバナンスは試験範囲の重要キーワードです。'
  },
  {
    id: 'q206',
    chapter: '第4章 法律と倫理',
    topic: 'ガバナンス',
    prompt: 'ガバナンスの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ガバナンスは目的とリスク理解が前提です。'
  },
  {
    id: 'q207',
    chapter: '第4章 法律と倫理',
    topic: 'ガバナンス',
    prompt: 'ガバナンスの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ガバナンスには限界があります。'
  },
  {
    id: 'q208',
    chapter: '第4章 法律と倫理',
    topic: 'ガバナンス',
    prompt: 'ガバナンスの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'ガバナンスは用語と場面理解が重要です。'
  },
  {
    id: 'q209',
    chapter: '第4章 法律と倫理',
    topic: 'ガバナンス',
    prompt: 'ガバナンスと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q210',
    chapter: '第4章 法律と倫理',
    topic: 'ガバナンス',
    prompt: 'ガバナンスの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q211',
    chapter: '第4章 法律と倫理',
    topic: 'リスク管理',
    prompt: 'リスク管理に関する説明として最も適切なのはどれですか。',
    choices: [
      'リスク管理の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'リスク管理は試験範囲の重要キーワードです。'
  },
  {
    id: 'q212',
    chapter: '第4章 法律と倫理',
    topic: 'リスク管理',
    prompt: 'リスク管理の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'リスク管理は目的とリスク理解が前提です。'
  },
  {
    id: 'q213',
    chapter: '第4章 法律と倫理',
    topic: 'リスク管理',
    prompt: 'リスク管理の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'リスク管理には限界があります。'
  },
  {
    id: 'q214',
    chapter: '第4章 法律と倫理',
    topic: 'リスク管理',
    prompt: 'リスク管理の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'リスク管理は用語と場面理解が重要です。'
  },
  {
    id: 'q215',
    chapter: '第4章 法律と倫理',
    topic: 'リスク管理',
    prompt: 'リスク管理と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q216',
    chapter: '第4章 法律と倫理',
    topic: 'リスク管理',
    prompt: 'リスク管理の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q217',
    chapter: '第4章 法律と倫理',
    topic: 'ディープフェイク',
    prompt: 'ディープフェイクに関する説明として最も適切なのはどれですか。',
    choices: [
      'ディープフェイクの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'ディープフェイクは試験範囲の重要キーワードです。'
  },
  {
    id: 'q218',
    chapter: '第4章 法律と倫理',
    topic: 'ディープフェイク',
    prompt: 'ディープフェイクの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ディープフェイクは目的とリスク理解が前提です。'
  },
  {
    id: 'q219',
    chapter: '第4章 法律と倫理',
    topic: 'ディープフェイク',
    prompt: 'ディープフェイクの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ディープフェイクには限界があります。'
  },
  {
    id: 'q220',
    chapter: '第4章 法律と倫理',
    topic: 'ディープフェイク',
    prompt: 'ディープフェイクの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'ディープフェイクは用語と場面理解が重要です。'
  },
  {
    id: 'q221',
    chapter: '第4章 法律と倫理',
    topic: 'ディープフェイク',
    prompt: 'ディープフェイクと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q222',
    chapter: '第4章 法律と倫理',
    topic: 'ディープフェイク',
    prompt: 'ディープフェイクの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q223',
    chapter: '第4章 法律と倫理',
    topic: 'セキュリティ',
    prompt: 'セキュリティに関する説明として最も適切なのはどれですか。',
    choices: [
      'セキュリティの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'セキュリティは試験範囲の重要キーワードです。'
  },
  {
    id: 'q224',
    chapter: '第4章 法律と倫理',
    topic: 'セキュリティ',
    prompt: 'セキュリティの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'セキュリティは目的とリスク理解が前提です。'
  },
  {
    id: 'q225',
    chapter: '第4章 法律と倫理',
    topic: 'セキュリティ',
    prompt: 'セキュリティの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'セキュリティには限界があります。'
  },
  {
    id: 'q226',
    chapter: '第4章 法律と倫理',
    topic: 'セキュリティ',
    prompt: 'セキュリティの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'セキュリティは用語と場面理解が重要です。'
  },
  {
    id: 'q227',
    chapter: '第4章 法律と倫理',
    topic: 'セキュリティ',
    prompt: 'セキュリティと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q228',
    chapter: '第4章 法律と倫理',
    topic: 'セキュリティ',
    prompt: 'セキュリティの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q229',
    chapter: '第4章 法律と倫理',
    topic: '説明責任',
    prompt: '説明責任に関する説明として最も適切なのはどれですか。',
    choices: [
      '説明責任の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '説明責任は試験範囲の重要キーワードです。'
  },
  {
    id: 'q230',
    chapter: '第4章 法律と倫理',
    topic: '説明責任',
    prompt: '説明責任の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '説明責任は目的とリスク理解が前提です。'
  },
  {
    id: 'q231',
    chapter: '第4章 法律と倫理',
    topic: '説明責任',
    prompt: '説明責任の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '説明責任には限界があります。'
  },
  {
    id: 'q232',
    chapter: '第4章 法律と倫理',
    topic: '説明責任',
    prompt: '説明責任の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '説明責任は用語と場面理解が重要です。'
  },
  {
    id: 'q233',
    chapter: '第4章 法律と倫理',
    topic: '説明責任',
    prompt: '説明責任と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q234',
    chapter: '第4章 法律と倫理',
    topic: '説明責任',
    prompt: '説明責任の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q235',
    chapter: '第4章 法律と倫理',
    topic: '国際規制',
    prompt: '国際規制に関する説明として最も適切なのはどれですか。',
    choices: [
      '国際規制の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '国際規制は試験範囲の重要キーワードです。'
  },
  {
    id: 'q236',
    chapter: '第4章 法律と倫理',
    topic: '国際規制',
    prompt: '国際規制の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '国際規制は目的とリスク理解が前提です。'
  },
  {
    id: 'q237',
    chapter: '第4章 法律と倫理',
    topic: '国際規制',
    prompt: '国際規制の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '国際規制には限界があります。'
  },
  {
    id: 'q238',
    chapter: '第4章 法律と倫理',
    topic: '国際規制',
    prompt: '国際規制の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '国際規制は用語と場面理解が重要です。'
  },
  {
    id: 'q239',
    chapter: '第4章 法律と倫理',
    topic: '国際規制',
    prompt: '国際規制と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q240',
    chapter: '第4章 法律と倫理',
    topic: '国際規制',
    prompt: '国際規制の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q241',
    chapter: '第5章 活用実務',
    topic: 'PoC',
    prompt: 'PoCに関する説明として最も適切なのはどれですか。',
    choices: [
      'PoCの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'PoCは試験範囲の重要キーワードです。'
  },
  {
    id: 'q242',
    chapter: '第5章 活用実務',
    topic: 'PoC',
    prompt: 'PoCの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'PoCは目的とリスク理解が前提です。'
  },
  {
    id: 'q243',
    chapter: '第5章 活用実務',
    topic: 'PoC',
    prompt: 'PoCの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'PoCには限界があります。'
  },
  {
    id: 'q244',
    chapter: '第5章 活用実務',
    topic: 'PoC',
    prompt: 'PoCの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'PoCは用語と場面理解が重要です。'
  },
  {
    id: 'q245',
    chapter: '第5章 活用実務',
    topic: 'PoC',
    prompt: 'PoCと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q246',
    chapter: '第5章 活用実務',
    topic: 'PoC',
    prompt: 'PoCの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q247',
    chapter: '第5章 活用実務',
    topic: 'KPI',
    prompt: 'KPIに関する説明として最も適切なのはどれですか。',
    choices: [
      'KPIの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'KPIは試験範囲の重要キーワードです。'
  },
  {
    id: 'q248',
    chapter: '第5章 活用実務',
    topic: 'KPI',
    prompt: 'KPIの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'KPIは目的とリスク理解が前提です。'
  },
  {
    id: 'q249',
    chapter: '第5章 活用実務',
    topic: 'KPI',
    prompt: 'KPIの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'KPIには限界があります。'
  },
  {
    id: 'q250',
    chapter: '第5章 活用実務',
    topic: 'KPI',
    prompt: 'KPIの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'KPIは用語と場面理解が重要です。'
  },
  {
    id: 'q251',
    chapter: '第5章 活用実務',
    topic: 'KPI',
    prompt: 'KPIと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q252',
    chapter: '第5章 活用実務',
    topic: 'KPI',
    prompt: 'KPIの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q253',
    chapter: '第5章 活用実務',
    topic: 'テンプレート',
    prompt: 'テンプレートに関する説明として最も適切なのはどれですか。',
    choices: [
      'テンプレートの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'テンプレートは試験範囲の重要キーワードです。'
  },
  {
    id: 'q254',
    chapter: '第5章 活用実務',
    topic: 'テンプレート',
    prompt: 'テンプレートの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'テンプレートは目的とリスク理解が前提です。'
  },
  {
    id: 'q255',
    chapter: '第5章 活用実務',
    topic: 'テンプレート',
    prompt: 'テンプレートの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'テンプレートには限界があります。'
  },
  {
    id: 'q256',
    chapter: '第5章 活用実務',
    topic: 'テンプレート',
    prompt: 'テンプレートの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'テンプレートは用語と場面理解が重要です。'
  },
  {
    id: 'q257',
    chapter: '第5章 活用実務',
    topic: 'テンプレート',
    prompt: 'テンプレートと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q258',
    chapter: '第5章 活用実務',
    topic: 'テンプレート',
    prompt: 'テンプレートの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q259',
    chapter: '第5章 活用実務',
    topic: '教育',
    prompt: '教育に関する説明として最も適切なのはどれですか。',
    choices: [
      '教育の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '教育は試験範囲の重要キーワードです。'
  },
  {
    id: 'q260',
    chapter: '第5章 活用実務',
    topic: '教育',
    prompt: '教育の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '教育は目的とリスク理解が前提です。'
  },
  {
    id: 'q261',
    chapter: '第5章 活用実務',
    topic: '教育',
    prompt: '教育の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '教育には限界があります。'
  },
  {
    id: 'q262',
    chapter: '第5章 活用実務',
    topic: '教育',
    prompt: '教育の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '教育は用語と場面理解が重要です。'
  },
  {
    id: 'q263',
    chapter: '第5章 活用実務',
    topic: '教育',
    prompt: '教育と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q264',
    chapter: '第5章 活用実務',
    topic: '教育',
    prompt: '教育の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q265',
    chapter: '第5章 活用実務',
    topic: '運用',
    prompt: '運用に関する説明として最も適切なのはどれですか。',
    choices: [
      '運用の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '運用は試験範囲の重要キーワードです。'
  },
  {
    id: 'q266',
    chapter: '第5章 活用実務',
    topic: '運用',
    prompt: '運用の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '運用は目的とリスク理解が前提です。'
  },
  {
    id: 'q267',
    chapter: '第5章 活用実務',
    topic: '運用',
    prompt: '運用の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '運用には限界があります。'
  },
  {
    id: 'q268',
    chapter: '第5章 活用実務',
    topic: '運用',
    prompt: '運用の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '運用は用語と場面理解が重要です。'
  },
  {
    id: 'q269',
    chapter: '第5章 活用実務',
    topic: '運用',
    prompt: '運用と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q270',
    chapter: '第5章 活用実務',
    topic: '運用',
    prompt: '運用の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q271',
    chapter: '第5章 活用実務',
    topic: 'インシデント',
    prompt: 'インシデントに関する説明として最も適切なのはどれですか。',
    choices: [
      'インシデントの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'インシデントは試験範囲の重要キーワードです。'
  },
  {
    id: 'q272',
    chapter: '第5章 活用実務',
    topic: 'インシデント',
    prompt: 'インシデントの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'インシデントは目的とリスク理解が前提です。'
  },
  {
    id: 'q273',
    chapter: '第5章 活用実務',
    topic: 'インシデント',
    prompt: 'インシデントの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'インシデントには限界があります。'
  },
  {
    id: 'q274',
    chapter: '第5章 活用実務',
    topic: 'インシデント',
    prompt: 'インシデントの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'インシデントは用語と場面理解が重要です。'
  },
  {
    id: 'q275',
    chapter: '第5章 活用実務',
    topic: 'インシデント',
    prompt: 'インシデントと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q276',
    chapter: '第5章 活用実務',
    topic: 'インシデント',
    prompt: 'インシデントの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q277',
    chapter: '第5章 活用実務',
    topic: 'ベンダー選定',
    prompt: 'ベンダー選定に関する説明として最も適切なのはどれですか。',
    choices: [
      'ベンダー選定の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'ベンダー選定は試験範囲の重要キーワードです。'
  },
  {
    id: 'q278',
    chapter: '第5章 活用実務',
    topic: 'ベンダー選定',
    prompt: 'ベンダー選定の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ベンダー選定は目的とリスク理解が前提です。'
  },
  {
    id: 'q279',
    chapter: '第5章 活用実務',
    topic: 'ベンダー選定',
    prompt: 'ベンダー選定の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ベンダー選定には限界があります。'
  },
  {
    id: 'q280',
    chapter: '第5章 活用実務',
    topic: 'ベンダー選定',
    prompt: 'ベンダー選定の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'ベンダー選定は用語と場面理解が重要です。'
  },
  {
    id: 'q281',
    chapter: '第5章 活用実務',
    topic: 'ベンダー選定',
    prompt: 'ベンダー選定と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q282',
    chapter: '第5章 活用実務',
    topic: 'ベンダー選定',
    prompt: 'ベンダー選定の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q283',
    chapter: '第5章 活用実務',
    topic: 'ROI',
    prompt: 'ROIに関する説明として最も適切なのはどれですか。',
    choices: [
      'ROIの基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: 'ROIは試験範囲の重要キーワードです。'
  },
  {
    id: 'q284',
    chapter: '第5章 活用実務',
    topic: 'ROI',
    prompt: 'ROIの実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ROIは目的とリスク理解が前提です。'
  },
  {
    id: 'q285',
    chapter: '第5章 活用実務',
    topic: 'ROI',
    prompt: 'ROIの誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'ROIには限界があります。'
  },
  {
    id: 'q286',
    chapter: '第5章 活用実務',
    topic: 'ROI',
    prompt: 'ROIの学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: 'ROIは用語と場面理解が重要です。'
  },
  {
    id: 'q287',
    chapter: '第5章 活用実務',
    topic: 'ROI',
    prompt: 'ROIと関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q288',
    chapter: '第5章 活用実務',
    topic: 'ROI',
    prompt: 'ROIの導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q289',
    chapter: '第5章 活用実務',
    topic: '品質保証',
    prompt: '品質保証に関する説明として最も適切なのはどれですか。',
    choices: [
      '品質保証の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '品質保証は試験範囲の重要キーワードです。'
  },
  {
    id: 'q290',
    chapter: '第5章 活用実務',
    topic: '品質保証',
    prompt: '品質保証の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '品質保証は目的とリスク理解が前提です。'
  },
  {
    id: 'q291',
    chapter: '第5章 活用実務',
    topic: '品質保証',
    prompt: '品質保証の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '品質保証には限界があります。'
  },
  {
    id: 'q292',
    chapter: '第5章 活用実務',
    topic: '品質保証',
    prompt: '品質保証の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '品質保証は用語と場面理解が重要です。'
  },
  {
    id: 'q293',
    chapter: '第5章 活用実務',
    topic: '品質保証',
    prompt: '品質保証と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q294',
    chapter: '第5章 活用実務',
    topic: '品質保証',
    prompt: '品質保証の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  },
  {
    id: 'q295',
    chapter: '第5章 活用実務',
    topic: '継続改善',
    prompt: '継続改善に関する説明として最も適切なのはどれですか。',
    choices: [
      '継続改善の基本概念と活用',
      '無関係な物理工事',
      'DNS設定のみ',
      '必ず100%正確'
    ],
    answers: [
      0
    ],
    explanation: '継続改善は試験範囲の重要キーワードです。'
  },
  {
    id: 'q296',
    chapter: '第5章 活用実務',
    topic: '継続改善',
    prompt: '継続改善の実務で重要な点として正しいのはどれですか。',
    choices: [
      '目的とリスクを理解して使う',
      '無検証で全自動化',
      'ログ削除',
      '規約確認不要'
    ],
    answers: [
      0
    ],
    explanation: '継続改善は目的とリスク理解が前提です。'
  },
  {
    id: 'q297',
    chapter: '第5章 活用実務',
    topic: '継続改善',
    prompt: '継続改善の誤解として適切なのはどれですか。',
    choices: [
      '万能で必ず正しいわけではない',
      '常に正確',
      '更新不要',
      '人の確認不要'
    ],
    answers: [
      0
    ],
    explanation: '継続改善には限界があります。'
  },
  {
    id: 'q298',
    chapter: '第5章 活用実務',
    topic: '継続改善',
    prompt: '継続改善の学習で押さえるべき内容を2つ選んでください。',
    choices: [
      '基本用語',
      '活用場面',
      '無制限監視',
      '社外秘入力推奨'
    ],
    answers: [
      0,
      1
    ],
    explanation: '継続改善は用語と場面理解が重要です。'
  },
  {
    id: 'q299',
    chapter: '第5章 活用実務',
    topic: '継続改善',
    prompt: '継続改善と関連する試験対策として適切なのはどれですか。',
    choices: [
      '公式シラバスのキーワードを整理する',
      '本番問題転載',
      '暗記のみ',
      '更新確認不要'
    ],
    answers: [
      0
    ],
    explanation: 'シラバス整理が基本です。'
  },
  {
    id: 'q300',
    chapter: '第5章 活用実務',
    topic: '継続改善',
    prompt: '継続改善の導入判断で確認すべき点として正しいのはどれですか。',
    choices: [
      '効果・コスト・リスク',
      'UI色のみ',
      '社名',
      '会議室'
    ],
    answers: [
      0
    ],
    explanation: '効果・コスト・リスクの三点確認が重要です。'
  }
]
