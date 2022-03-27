<template>
  <div ref="console" class="term"></div>
</template>

<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import "xterm/css/xterm.css";
import axios from "axios";
import Vue from "vue";
export default {
  name: "Term",
  data() {
    return {
      data: {
        user: "",
        path: "",
        token: "",
      },
      cmd: "",
      term: Object,
      fitAddon: Object,
    };
  },
  methods: {
    //处理字符的输入，如控制台常有的roo@path:$
    strHandle() {
      return arguments.length == 2
        ? arguments[0] + "@" + arguments[1] + ":$ "
        : arguments[0] + "\n";
    },
    login() {
      axios
        .post("api/login", {
          username: "root",
          password: "123456",
        })
        .then((res) => {
          //  获取后台数据
          (this.data.user = "root"),
            (this.data.path = res.data.path),
            (this.data.token = res.data.token);
          let ws = new WebSocket("ws://localhost:8090/channel");
          ws.onmessage = (e) => {
            console.log(e);
            this.term.write(e.data+"\n");
            this.term.write(this.strHandle(this.data.user, this.data.path));
          };
          ws.onopen = () => {
            ws.send(JSON.stringify({ type: "login", token: this.data.token }));
          };
          // this.data = {
          //   user: "root",
          //   path: res.data.path,
          //   token: res.data.token,
          // };
          // xterm 进行渲染交互,ref属性绑定到相对应的dom上
          // this.term.open(this.$refs.console);
          this.term.write(this.strHandle(this.data.user, this.data.path));
          // 自适应屏幕大小
          this.fitAddon.fit();
        });
    },
    exec() {
      // 监听键盘输入事件
      this.term.onKey((e) => {
        //console.log(e);
        /*
                  esc = 27
                  回车 = 13
                  上下左右 = 37,38,39,40
                  backspace = 8
        */
        let code = e.domEvent.which;
        if (code === 13) {
          this.term.write(e.key + "\n");
          axios
            .post("api/exec", {
              token: this.data.token,
              command: this.cmd,
              time: new Date().getMilliseconds(),
            })
            .then((res) => {
              let command = this.cmd.split(" ")[0];
              if (command === "pwd") {
                this.term.write(this.strHandle(res.data.msg));
              } else if (command === "ls") {
                res.data.files.forEach((item) => {
                  this.term.write(this.strHandle(item));
                });
              } else if (command === "cd") {
                Vue.set(this.data.path, "path", res.data.path);
              }
              this.cmd = "";
              this.term.write(this.strHandle(this.data.user, this.data.path));
            });
        } else if (code === 8) {
          if (this.cmd.length !== 0) {
            this.term.write("\b \b");
            this.cmd = this.cmd.substring(0, this.cmd.length - 1);
          }
        } else {
          this.cmd = this.cmd + e.key;
          this.term.write(e.key);
        }
      });
    },
  },
  created() {
    this.term = new Terminal({
      rendererType: "canvas", //渲染类型
      rows: 28, //行数
      // cols: parseInt(_this.cols), // 不指定行数，自动回车后光标从下一行开始
      convertEol: true, //启用时，光标将设置为下一行的开头
      //   scrollback: 50, //终端中的回滚量
      disableStdin: false, //是否应禁用输入。
      cursorStyle: "underline", //光标样式
      cursorBlink: true, //光标闪烁
      theme: {
        foreground: "#7e9192", //字体
        background: "#002833", //背景色
        cursor: "help", //设置光标
        lineHeight: 16,
      },
    });
    this.fitAddon = new FitAddon();
    this.term.loadAddon(this.fitAddon);
  },
  mounted() {
    this.term.open(this.$refs.console);
    this.login();
    this.exec();
  },
};
</script>

<style>
</style>