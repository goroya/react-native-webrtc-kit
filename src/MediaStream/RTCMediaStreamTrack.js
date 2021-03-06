// @flow

import { NativeModules } from 'react-native';
import RTCMediaStreamTrackEventTarget from './RTCMediaStreamTrackEventTarget';
import WebRTC from '../WebRTC';

/**
 * トラックの状態を表します。
 * 
 * - `'live'` - トラックへの入力が継続している状態を示します。
 * 出力の可否は `enabled` で変更できますが、出力を無効にしても状態は `'live'` のままです。
 * 
 * - `'ended'` - トラックへの入力が停止し、再開する可能性がない状態を示します。
 * 
 * @typedef {string} RTCMediaStreamTrackState
 */
export type RTCMediaStreamTrackState =
    | 'live'
    | 'ended';

export default class RTCMediaStreamTrack extends RTCMediaStreamTrackEventTarget {

    /**
     * 所属するストリームのタグ
     */
    streamValueTag: string;

    /**
     * トラック ID
     */
    id: string;

    /**
     * トラックの種別
     * 
     * - `'video'` - 映像トラック
     * - `'audio'` - 音声トラック
     */
    kind: string;

    /**
     * トラックの状態
     */
    readyState: RTCMediaStreamTrackState;

    /**
     * リモートのトラックであれば `true`
     */
    remote: boolean;

    _enabled: boolean;

    /**
     * トラックの出力の可否
     * 
     * @type {boolean}
     */
    get enabled(): boolean {
        return this._enabled;
    }

    /**
     * トラックの出力の可否
     * 
     * @type {boolean}
     */
    set enabled(enabled: boolean): void {
        if (this._enabled === enabled) {
            return;
        }
        this._enabled = enabled;
        WebRTC.trackSetEnabled(this.id, this.streamValueTag, enabled);
    }

    /**
     * @private
     */
    constructor(info: Object) {
        super();
        this.streamValueTag = info.valueTag;
        this.id = info.id;
        this.kind = info.kind;
        this.readyState = info.readyState;
        this.remote = info.remote;
        this._enabled = info.enabled;
    }

    _close() {
        this._enabled = false;
        this.readyState = 'ended';
    }

}