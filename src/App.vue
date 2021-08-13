<template>
  <v-app>
    <v-form>
      <v-text-field label="プレイヤーネーム" v-model="playerName" />
      <v-text-field label="好きな色" v-model="favoriteColor" />
      <v-text-field label="活動地域" v-model="activityArea" />
      <v-text-field label="MTG歴" v-model="mtgHistory" />
      <v-select
        label="要望&お知らせ"
        v-model="notice"
        :items="noticeOptions"
        multiple
        chips
      />
      <v-select
        label="フォーマット"
        v-model="playingFormat"
        :items="playingFormatOptions"
        multiple
        chips
      />
      <v-radio-group label="カテゴリ" v-model="playerCategory">
        <v-radio label="初心者" value="初心者" />
        <v-radio
          label="カジュアル・エンジョイ"
          value="カジュアル・エンジョイ"
        />
        <v-radio label="ガチ・競技" value="ガチ・競技" />
      </v-radio-group>
      <v-textarea label="好きなカード" v-model="favoriteCard" />
      <v-textarea label="好きなデッキ" v-model="favoriteDeck" />
      <v-textarea label="フリースペース" v-model="freeSpace" />
    </v-form>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    playerName: "",
    favoriteColor: "",
    activityArea: "",
    mtgHistory: "",
    notice: [],
    noticeOptions: [
      "対戦したい",
      "大会に参加したい",
      "MTG雑談したい",
      "デッキ相談したい",
      "YouTubeやってます",
      "ブログやってます",
      "アリーナやってます",
      "MOやってます",
      "コレクション自慢したい",
    ],
    playingFormat: [],
    playingFormatOptions: [
      "スタンダード",
      "ヒストリック",
      "パイオニア",
      "モダン",
      "レガシー",
      "ヴィンテージ",
      "統率者",
      "その他",
    ],
    playerCategory: "",
    favoriteCard: "",
    favoriteDeck: "",
    freeSpace: "",
  }),
};
</script>
