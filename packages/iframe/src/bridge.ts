/**
 * 这里可以整合定义 action 的统一枚举
 *
 *  1. 用来告知对外扩展的动作集合
 *  2. 可以以此作“友好”提示
 */
export enum ActionEnum {
    /** 动作 A */
    actionA = 'actionA',
    /** 动作 B */
    actionB = 'actionB',
    /** 动作 C */
    actionC = 'actionC',
}

/**
 * 向 iframe 发送消息，并定义好回调钩子
 *
 * @param action 动作
 * @param payload 附加参数
 *
 * @return Promise<{ success: boolean; result?: any; message?: string }>
 */
export const postMessageToIframe = (action: ActionEnum, payload?: any): Promise<{ success: boolean; result?: any; message?: string }> => {
    // 1. 这里考虑严谨的话需要考虑下动作是否合法
    if (!ActionEnum[action]) return Promise.reject({ success: false, message: `${action} 不合法` });

    return new Promise((resolve, reject) => {
        // 2. 定义接收回调数据钩子
        window[action] = (res: any) => {
            // todo something
            resolve({ success: true, result: res });
        };

        // 2. 向 iframe 发送消息
        window.parent.postMessage({ action, payload }, window.origin);
    });
};

// 扩展对外方法
export const bridgeToActionA = () => postMessageToIframe(ActionEnum.actionA);

// 扩展对外方法
export const bridgeToActionB = () => postMessageToIframe(ActionEnum.actionB);

// todo 继续扩展