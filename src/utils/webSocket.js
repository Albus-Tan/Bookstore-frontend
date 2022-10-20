module.exports = class webSocket {

    constructor(socketUrl, onmessageCallback) {
        this.socketUrl = socketUrl;
        this.onmessageCallback = onmessageCallback;
        this.reconnectCount = 0;
        this.socket = null;
        this.taskRemindInterval = null;
        this.isSucces=false;
    }

    connection = () => {
        let socketUrl = this.socketUrl;
        console.log("socket 准备连接 " + socketUrl);
        // 检测当前浏览器是什么浏览器来决定用什么socket
        if ('WebSocket' in window) {
            this.socket = new WebSocket(socketUrl);
        }
        else {
            alert('当前浏览器不支持 websocket')
        }
        this.socket.onopen = this.onopen;
        this.socket.onmessage = this.onmessage;
        this.socket.onclose = this.onclose;
        this.socket.onerror = this.onerror;
        this.socket.sendMessage = this.sendMessage;
        this.socket.closeSocket = this.closeSocket;
    };

    // 连接成功触发
    onopen = () => {
        console.log("socket 连接成功");
    };

    // 后端向前端推得数据
    onmessage = (msg) => {
        console.log("socket 接收到消息：" + msg);
        this.onmessageCallback(msg);
    };

    // 关闭连接触发
    onclose = (e) => {
        console.log("socket 关闭连接");
        this.isSucces = false;
        if (this.socket !== null){
            this.socket.close();
        }
    };

    onerror = (e) => {
        // socket连接报错触发
        console.log("socket 连接报错");
        console.error(e);
        this.socket = null;
    };

    sendMessage = (value) => {
        // 向后端发送数据
        console.log("socket 向后端发送数据 " + value);
        if(this.socket) {
            this.socket.send(JSON.stringify(value));
        }
    };

    closeSocket = () => {
        this.socket.close();
    };

    //获得状态
    readyState = () => {
        return this.socket.readyState;
    }
};

