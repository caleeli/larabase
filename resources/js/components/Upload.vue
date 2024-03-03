<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="upload-region" @click="click">
    <b-input-group>
      <b-form-input
        :placeholder="placeholder"
        v-model="name"
        readonly
        :class="disabled ? '' : 'bg-white'"
      />
      <b-input-group-append>
        <b-button size="sm" variant="primary" :disabled="disabled">
          <i :class="`fas ${capture ? 'fa-camera' : 'fa-file'}`"></i>
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <div class="form-file-progress">
      <input
        :id="id"
        type="file"
        v-on:change="changeFile($event, multiplefile)"
        v-bind:disabled="disabled"
        v-bind:accept="accept"
        v-bind:multiple="multiplefile"
        v-bind:capture="capture"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    accept: {
      type: String,
      default: '',
    },
    multiplefile: Boolean,
    url: {
      type: String,
      default: '/api/upload_file',
    },
    placeholder: {
      type: String,
      default: '',
    },
    capture: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bgStyle() {
      return `linear-gradient(90deg, rgba(0,0,0,0.5) ${
        this.progress
      }%, transparent ${100 - this.progress}%)`;
    },
  },
  data() {
    return {
      progress: 100,
      name: '',
    };
  },
  methods: {
    click(event) {
      this.$emit('click', event);
    },
    changeFile(event, multiple) {
      const data = new FormData();
      // eslint-disable-next-line no-plusplus
      for (let i = 0, l = event.target.files.length; i < l; i++) {
        data.append(`file${multiple ? '[]' : ''}`, event.target.files[i]);
      }
      this.progress = 0;
      const separator = this.url.indexOf('?') === -1 ? '?' : '&';
      const url = this.url + (
        this.accept
          ? `${separator}accept=${encodeURIComponent(this.accept)}`
          : ''
      );

      // meta[name="csrf-token"]
      const token = document.head.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'X-CSRF-TOKEN': token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((json) => {
          this.name = json.name;
          this.$emit('input', json, this);
          this.$emit('change', json, this);
          this.progress = 100;
        })
        .catch((error) => {
          this.progress = 100;
          this.$emit('error', error);
        });
      // clear input file value
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    },
    clear() {
      this.name = '';
      this.$emit('input', null, this);
    },
  },
  watch: {
    value() {
      this.name = this.value?.name || '';
    },
  },
};
</script>

<style scoped>
.upload-container {
  width: 100%;
  height: 100%;
}
.upload-region {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 2rem;
}
.form-file-progress {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}
.form-file-progress input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
}
</style>
