<template>
  <div>
    <v-shell
      :banner="banner"
      :shell_input="send_to_terminal"
      :commands="commands"
      @shell_output="prompt"
    ></v-shell>
  </div>
</template>

<script>
import shell from 'vue-shell'
export default {
	name:'term',
	data() {
		return {
		  send_to_terminal: "",
		  login: {
			  account:'',
			  password:''
		  },
		  banner: {
			// header: "Vue Shell",
			// subHeader: "Shell is power just enjoy 🔥",
			// helpHeader: 'Enter "help" for more information.',
			currentInfo: {
				// time: 0,
				user:'root@',
				localHost:'localhost'
			},
			currentDir: "pwd:~$",
			// img: {
			// 	align: "left",
			// 	link: "/mylogo.png",
			// 	width: 100,
			// 	height: 100
			// }
		  },
		  commands: [
			{ name: "info",
			  desc: "Show information about this terminal",
			  get() {
				return `<p>info指令</p>`;
			}
			},
			{
			  name: "uname",
			  desc: "Show the current terminal name",
			  get() {
				return navigator.appVersion;
			  }
			}
		  ]
		};
	  },
	  methods: {
		prompt(value) {
		  if (value == "node -v") {
			this.send_to_terminal = process.versions.node;
		  }
		}
	  }
	};
</script>

<style>
</style>