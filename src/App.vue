<template>
  <v-app id="app">
    <v-main>
      <v-container :class="{ 'is-md': isMd }">
        <div class="preview-wrapper">
          <img
            :src="imgSrc"
            alt="MTG履歴書"
            width="800"
            height="450"
            class="preview"
          />
          <konva-stage :config="stageConfig" ref="stage" class="stage">
            <konva-layer>
              <konva-image :config="{ image: image.background }" />
              <konva-image :config="playerIconConfig" />
              <konva-text :config="playerNameConfig" />
              <konva-image
                v-if="formInput.gender !== '指定しない'"
                :config="genderConfig"
              />
              <konva-rect
                v-if="formInput.gender === '指定しない'"
                :config="{
                  x: 285,
                  y: 66,
                  width: 82,
                  height: 16,
                  fill: '#ffffff',
                }"
              />
              <konva-text :config="favoriteColorConfig" />
              <konva-text :config="activityAreaConfig" />
              <konva-text :config="playStyleConfig" />
              <konva-image
                v-for="(item, index) in noticeConfig"
                :key="`notice-${index}`"
                :config="item"
              />
              <konva-image
                v-for="(item, index) in playingFormatConfig"
                :key="`format-${index}`"
                :config="item"
              />
              <konva-text
                v-if="formInput.playingFormat.includes('その他')"
                :config="otherFormatConfig"
              />
              <konva-text :config="freeSpaceConfig" />
            </konva-layer>
          </konva-stage>
          <div class="btn-wrapper d-none d-md-block">
            <v-btn color="#1D9BF0" dark @click="shareTwitter"
              ><v-icon dark left>mdi-twitter</v-icon>シェアする</v-btn
            >
          </div>
          <footer class="footer footer-md d-none d-md-block">
            <a
              href="https://www.hareruyamtg.com/ja/"
              target="_blank"
              rel="noopener"
              >株式会社晴れる屋</a
            ><a @click.prevent="termsModal = true">利用規約</a>
          </footer>
        </div>
        <div class="form-wrapper">
          <v-form>
            <v-select
              label="背景色"
              v-model="formInput.background"
              :items="backgroundOptions"
              item-text="text"
              item-value="value"
              @change="updateBackground"
            />
            <v-select
              label="フォント"
              v-model="formInput.font"
              :items="fontOptions"
              item-text="text"
              item-value="value"
            />
            <v-file-input
              label="アイコン"
              v-model="uploadedFile"
              accept="image/*"
              @change="uploadIcon"
            />
            <v-text-field
              label="プレイヤーネーム"
              v-model="formInput.playerName"
            />
            <v-select
              label="性別"
              v-model="formInput.gender"
              :items="genderOptions"
            />
            <v-text-field label="好きな色" v-model="formInput.favoriteColor" />
            <v-text-field label="活動地域" v-model="formInput.activityArea" />
            <v-select
              label="プレイスタイル"
              v-model="formInput.playStyle"
              :items="playStyleOptions"
              multiple
              chips
            />
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
            <v-text-field
              v-if="formInput.playingFormat.includes('その他')"
              label="その他のフォーマット"
              v-model="formInput.otherFormat"
            />
            <v-textarea label="フリースペース" v-model="formInput.freeSpace" />
          </v-form>
          <v-btn
            color="#1D9BF0"
            class="d-block d-md-none"
            block
            dark
            @click="shareTwitter"
            ><v-icon dark left>mdi-twitter</v-icon>シェアする</v-btn
          >
          <footer class="footer d-block d-md-none">
            <a
              href="https://www.hareruyamtg.com/ja/"
              target="_blank"
              rel="noopener"
              >株式会社晴れる屋</a
            ><a>利用規約</a>
          </footer>
        </div>
      </v-container>
    </v-main>
    <v-dialog v-model="cropperModal" max-width="50vh">
      <v-card>
        <v-card-title>アイコンの切り抜き</v-card-title>
        <v-card-text>
          <vue-cropper
            ref="cropper"
            class="cropper"
            :aspect-ratio="1 / 1"
            :src="formInput.playerIcon"
            :viewMode="1"
            :guides="false"
            :background="false"
            :autoCropArea="1"
            dragMode="move"
            :cropBoxMovable="false"
            :cropBoxResizable="false"
            @ready="initCropper"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="updateIcon">確定する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="termsModal" max-width="40rem" scrollable>
      <v-card>
        <v-card-title>利用規約</v-card-title>
        <v-divider />
        <v-card-text><termsText /></v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn @click="termsModal = false" text color="primary">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import VueCropper from "vue-cropperjs";
import termsText from "./components/termsText.vue";
import "cropperjs/dist/cropper.css";

const fontSizeAdjustment = (text, invaliantLength, width) => {
  return text.length > invaliantLength ? width / text.length : 24;
};

export default {
  name: "App",
  components: { VueCropper, termsText },
  data: () => ({
    imgSrc: "",
    uploadedFile: null,
    croppedIcon: null,
    cropperModal: false,
    termsModal: false,
    formInput: {
      background: "w",
      font: "Yusei Magic",
      playerIcon: "",
      playerName: "",
      gender: "指定しない",
      favoriteColor: "",
      activityArea: "",
      playStyle: [],
      notice: [],
      playingFormat: [],
      otherFormat: "",
      freeSpace: "",
    },
    backgroundOptions: [
      { text: "白", value: "w" },
      { text: "青", value: "u" },
      { text: "黒", value: "b" },
      { text: "赤", value: "r" },
      { text: "緑", value: "g" },
    ],
    fontOptions: [
      { text: "油性マジック", value: "Yusei Magic" },
      { text: "源ノ角ゴシック", value: "Noto Sans JP" },
      { text: "源ノ明朝", value: "Noto Serif JP" },
    ],
    genderOptions: ["男性", "女性", "指定しない"],
    playStyleOptions: ["初心者", "カジュアル", "競技", "コレクター"],
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
    image: {
      check: null,
      background: null,
    },
  }),
  computed: {
    isMd() {
      const bp = this.$vuetify.breakpoint.name;
      return bp === "md" || bp === "lg" || bp === "xl";
    },
    fontConfig() {
      return {
        fontSize: 24,
        fontFamily: this.formInput.font,
        wrap: "char",
      };
    },
    checkConfig() {
      return {
        image: this.image.check,
        width: 15,
        height: 11,
      };
    },
    playerIconConfig() {
      const x = 15;
      const y = 60;
      const size = 150;
      const image = this.croppedIcon;
      return {
        image,
        x,
        y,
        width: size,
        height: size,
      };
    },
    playerNameConfig() {
      const text = this.formInput.playerName;
      const fontSize = fontSizeAdjustment(text, 13, 290);
      const x = 190;
      const y = 104 - fontSize / 2;
      return { ...this.fontConfig, text, fontSize, x, y };
    },
    genderConfig() {
      const config = { ...this.checkConfig, x: 285, y: 68 };
      if (this.formInput.gender === "女性") {
        config.x = 328;
      }
      return config;
    },
    favoriteColorConfig() {
      const text = this.formInput.favoriteColor;
      const fontSize = fontSizeAdjustment(text, 13, 290);
      const x = 190;
      const y = 184 - fontSize / 2;
      return { ...this.fontConfig, text, fontSize, x, y };
    },
    activityAreaConfig() {
      const text = this.formInput.activityArea;
      const fontSize = fontSizeAdjustment(text, 12, 290);
      const x = 505;
      const y = 104 - fontSize / 2;
      return { ...this.fontConfig, text, fontSize, x, y };
    },
    playStyleConfig() {
      const playStyleOptions = Array.from(this.playStyleOptions);
      const text = Array.from(this.formInput.playStyle)
        .sort(function (a, b) {
          if (playStyleOptions.indexOf(a) < playStyleOptions.indexOf(b)) {
            return -1;
          }
          return 1;
        })
        .toString();
      const fontSize = fontSizeAdjustment(text, 13, 290);
      const x = 505;
      const y = 184 - fontSize / 2;
      return { ...this.fontConfig, text, fontSize, x, y };
    },
    noticeConfig() {
      const checkArray = [];
      const x = 22;
      this.formInput.notice.forEach((item) => {
        const index = this.noticeOptions.indexOf(item);
        checkArray.push({ ...this.checkConfig, x, y: 253 + 19 * index });
      });
      return checkArray;
    },
    playingFormatConfig() {
      const formatArray = [];
      const x = 191;
      this.formInput.playingFormat.forEach((item) => {
        const index = this.playingFormatOptions.indexOf(item);
        formatArray.push({ ...this.checkConfig, x, y: 253 + 19 * index });
      });
      return formatArray;
    },
    otherFormatConfig() {
      const text = this.formInput.otherFormat;
      const fontSize = 12;
      const x = 200;
      const y = 404;
      return { ...this.fontConfig, text, fontSize, x, y };
    },
    freeSpaceConfig() {
      const text = this.formInput.freeSpace;
      const x = 330;
      const y = 252;
      const width = 440;
      const height = 180;
      return {
        ...this.fontConfig,
        text,
        x,
        y,
        width,
        height,
        lineHeight: 1.25,
      };
    },
  },
  methods: {
    updateCanvas() {
      const stage = this.$refs.stage;
      stage.getNode().draw();
      this.imgSrc = stage.getStage().toDataURL();
    },
    uploadIcon() {
      this.formInput.playerIcon = URL.createObjectURL(this.uploadedFile);
      this.cropperModal = true;
      if (this.croppedIcon) {
        this.initCropper();
      }
    },
    initCropper() {
      const cropper = this.$refs.cropper;
      cropper.replace(this.formInput.playerIcon);
    },
    updateIcon() {
      const icon = new window.Image();
      const src = this.$refs.cropper.getCroppedCanvas().toDataURL();
      icon.src = src;

      this.croppedIcon = icon;

      const self = this;
      setTimeout(function () {
        self.updateCanvas();
      }, 100);

      this.cropperModal = false;
    },
    mountImage(path, target) {
      const image = new window.Image();
      image.src = path;
      image.onload = () => {
        this.image[target] = image;
      };
    },
    updateBackground() {
      const color = this.formInput.background;
      this.mountImage(
        require(`@/assets/twitter_2107_MTGRirekisho_${color}.png`),
        "background"
      );
      this.mountImage(
        require(`@/assets/twitter_2107_MTGRirekishoReten_${color}.png`),
        "check"
      );
    },
    shareTwitter() {
      const shareURL =
        "https://twitter.com/intent/tweet?url=https://resume.hareruyamtg.com&text=%20%23MTG履歴書";
      location.href = shareURL;
    },
  },
  mounted() {
    this.$watch(
      "formInput",
      function () {
        const self = this;
        setTimeout(function () {
          self.updateCanvas();
        }, 200);
      },
      { deep: true }
    );

    this.$watch(
      "image",
      function () {
        this.updateCanvas();
      },
      { deep: true }
    );
  },
  created() {
    this.updateBackground();
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&family=Noto+Serif+JP:wght@700&family=Yusei+Magic&display=swap");

#app {
  background: #ddd;
}

.container {
  justify-content: center;
  background: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  padding: 0 0.75rem 0 0.75rem;
}
.container.is-md {
  display: flex;
  overflow-y: hidden;
  .preview-wrapper {
    margin-right: 1.5rem;
    .preview {
      margin-bottom: 0.5rem;
    }
  }
  .form-wrapper {
    height: 100vh;
    padding: 0.75rem 0;
    overflow-x: hidden;
    overflow-y: scroll;
    flex-basis: 32rem;
  }
}
.preview-wrapper {
  text-align: center;
  padding-top: 0.75rem;
  margin-bottom: 1rem;
}

.preview {
  max-width: 100%;
  height: auto;
}
.stage {
  display: none;
}
.cropper {
  max-height: 50vh;
  position: relative;
}

.btn-wrapper {
  text-align: left;
}

.footer {
  font-size: 0.75rem;
  padding: 1rem;
  text-align: center;
  color: #888888;
  a {
    color: #888888;
    text-decoration: none;
    &:hover {
      color: #333333;
    }
    + a {
      margin-left: 1rem;
    }
  }
}
.footer-md {
  position: absolute;
  padding: 0;
  bottom: 0.75rem;
  text-align: left;
}

.v-card__title {
  font-weight: 700;
}
</style>
