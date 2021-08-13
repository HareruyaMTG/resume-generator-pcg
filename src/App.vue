<template>
  <v-app>
    <konva-stage :config="stageConfig">
      <konva-layer>
        <konva-image :config="{ image: background }" />
        <konva-text :config="playerNameConfig" />
      </konva-layer>
    </konva-stage>
    <v-form>
      <v-text-field label="プレイヤーネーム" v-model="formInput.playerName" />
      <v-text-field label="好きな色" v-model="formInput.favoriteColor" />
      <v-text-field label="活動地域" v-model="formInput.activityArea" />
      <v-text-field label="MTG歴" v-model="formInput.mtgHistory" />
      <v-select
        label="要望&お知らせ"
        v-model="formInput.notice"
        :items="noticeOptions"
        multiple
        chips
      />
      <v-select
        label="フォーマット"
        v-model="formInput.playingFormat"
        :items="playingFormatOptions"
        multiple
        chips
      />
      <v-radio-group label="カテゴリ" v-model="formInput.playerCategory">
        <v-radio label="初心者" value="初心者" />
        <v-radio
          label="カジュアル・エンジョイ"
          value="カジュアル・エンジョイ"
        />
        <v-radio label="ガチ・競技" value="ガチ・競技" />
      </v-radio-group>
      <v-textarea label="好きなカード" v-model="formInput.favoriteCard" />
      <v-textarea label="好きなデッキ" v-model="formInput.favoriteDeck" />
      <v-textarea label="フリースペース" v-model="formInput.freeSpace" />
    </v-form>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    formInput: {
      playerName: "",
      favoriteColor: "",
      activityArea: "",
      mtgHistory: "",
      notice: [],
      playingFormat: [],
      playerCategory: "",
      favoriteCard: "",
      favoriteDeck: "",
      freeSpace: "",
    },
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
    stageConfig: {
      width: 800,
      height: 450,
    },
    fontSetting: {
      fontSize: 24,
      fontFamily: "Yusei Magic",
    },
    background: null,
  }),
  computed: {
    playerNameConfig() {
      const text = this.formInput.playerName;
      const x = 190;
      const y = 97;
      return { ...this.fontSetting, text, x, y };
    },
  },
  created() {
    const background = new window.Image();
    background.src = require("@/assets/twitter_2107_MTGRirekisho.jpg");
    background.onload = () => {
      this.background = background;
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap");
</style>
