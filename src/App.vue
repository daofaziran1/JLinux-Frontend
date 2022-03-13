<template>
  <div id="terminal"></div>
</template>
<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import "xterm/css/xterm.css";
import axios from "axios";
import Vue from 'vue'

export default {
  name: "Console",
  data() {
    return {
      data: {
        user: "",
        path: "",
        token: "",
      },
    };
  },
  mounted() {
    axios
      .post("api/login", {
        username: "root",
        password: "123456",
      })
      .then((res) => {
        console.log(res);
        this.data = {
          user: "root",
          path: res.data.path,
          token: res.data.token,
        };
        var term = new Terminal({
          rendererType: "canvas", //渲染类型
          rows: 100, //行数
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
        // 将xterm渲染到前端
        term.open(document.getElementById("terminal"));
        term.write(this.data.user + "@" + this.data.path + "$ ");
        // 记录命令
        var cmd = "";
        // 监听键盘输入事件
        term.onKey((e) => {
          /*
                esc = 27
                回车 = 13
                上下左右 = 37,38,39,40
            */
          console.log(cmd);
          let code = e.domEvent.which;
          if (code === 13) {
            term.write(e.key + "\n");
            axios
              .post("api/exec", {
                token: this.data.token,
                command: cmd,
                time: new Date().getMilliseconds(),
              })
              .then((res) => {
                let command = cmd.split(" ")[0];
                if (command === "pwd") {
                  term.write(res.data.msg + "\n");
                } else if (command === "ls") {
                  res.data.files.forEach((item) => {
                    term.write(item + "\n");
                  });
                } else if (command === "cd") {
                  Vue.set(this.data,"path",res.data.path);
                }
                cmd = "";
                term.write(this.data.user + "@" + this.data.path + "$ ");
              });
          } else if (code === 8) {
            term.write("\b \b");
            cmd = cmd.substring(0, cmd.length - 1);
          } else {
            cmd = cmd + e.key;
            term.write(e.key);
          }
        });
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        fitAddon.fit();
      });
  },
};
</script>