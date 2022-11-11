/**
 * 初始化 iframe
 *  1. 事件监听
 *  2. 窗体初始化
 *
 * @param iframe 容器
 */
export const initIframe = (iframe: HTMLIFrameElement | null) => {
    // 1. 判空
    if (!iframe) return () => { };

    /**
     * 窗体宽高自适应
     *
     * @param iframe 元素
     */
    const handleResize = () => {
        if (!iframe) return;

        // 获取父元素
        const parentNode = iframe.parentNode as HTMLDivElement;
        const { width, height } = parentNode.getBoundingClientRect() || {};
        iframe.width = width ? width + 'px' : '100%';
        iframe.height = height ? height + 'px' : '100%';
        parentNode.style.overflow = 'hidden';
    };

    /**
     * 处理消息回调
     */
    const handleMessage = (evt: MessageEvent) => {
        // 1. 安全策略：同域名消息拦截
        if (evt.origin !== window.location.origin) return;

        const { action, data } = evt.data || {};
        let result;
        // 2. 处理消息策略
        switch (action) {
            case 'A':
                // todo something
                break;
            case 'B':
                // todo something
                break;
        }

        // 3. 回调通知子元素
        const childWindow = iframe.contentWindow;
        // 这里通过与子元素定义回调规则，这里假设以 action 同步定义
        const handler: ((result: any) => void) = childWindow[action] as any;
        handler && handler(result);
    };

    // 2. 初始化窗体宽高
    handleResize();

    // 3. 窗体自适应，避免窗口缩放引起的容器不缩放问题
    window.addEventListener('resize', handleResize, false);
    // 4. 父元素监听 message & 处理消息回调
    window.addEventListener('message', handleMessage, false);

    // 返回事件销毁回调，这个很重要！！！
    return () => {
        // 5. 销毁 resize 监听
        window.removeEventListener('resize', handleResize, false);
        // 6. 销毁 message 监听
        window.removeEventListener('message', handleMessage, false);
    };
};

