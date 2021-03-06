// @flow

import { NativeModules } from 'react-native';
import RTCConfiguration from './PeerConnection/RTCConfiguration';
import RTCIceCandidate from './PeerConnection/RTCIceCandidate';
import RTCMediaStream from './MediaStream/RTCMediaStream';
import RTCMediaStreamTrackEventTarget from './MediaStream/RTCMediaStreamTrackEventTarget';
import RTCMediaConstraints from './PeerConnection/RTCMediaConstraints';
import RTCMediaStreamConstraints from './MediaStream/RTCMediaStreamConstraints';
import RTCSessionDescription from './PeerConnection/RTCSessionDescription';
import type { ValueTag } from './PeerConnection/RTCPeerConnection';

const { WebRTCModule } = NativeModules;

/**
 * @package
 * 
 * ネイティブモジュールのメソッドを呼び出すラッパークラスです。
 * ネイティブメソッドに型注釈をつけて、 Flow で型検査をできるようにします。
 */
export default class WebRTC {

  static finishLoading() {
    WebRTCModule.finishLoading();
  }

  static getUserMedia(constraints: RTCMediaStreamConstraints): Promise<RTCMediaStream> {
    return WebRTCModule.getUserMedia(constraints.toJSON());
  }

  static stopUserMedia() {
    WebRTCModule.stopUserMedia();
  }

  static peerConnectionInit(valueTag: ValueTag,
    configuration: RTCConfiguration,
    constraints: RTCMediaConstraints) {
    WebRTCModule.peerConnectionInit(
      configuration.toJSON(), constraints.toJSON(), valueTag);
  }

  static peerConnectionAddICECandidate(valueTag: ValueTag,
    candidate: RTCIceCandidate): Promise<void> {
    return WebRTCModule.peerConnectionAddICECandidate(candidate.toJSON(), valueTag);
  }

  static peerConnectionAddStream(valueTag: ValueTag, streamValueTag: ValueTag) {
    WebRTCModule.peerConnectionAddStream(streamValueTag, valueTag);
  }

  static peerConnectionClose(valueTag: ValueTag) {
    WebRTCModule.peerConnectionClose(valueTag);
  }

  static peerConnectionCreateAnswer(valueTag: ValueTag,
    constraints: RTCMediaConstraints): Promise<RTCSessionDescription> {
    return WebRTCModule.peerConnectionCreateAnswer(valueTag, constraints.toJSON());
  }

  static peerConnectionCreateOffer(valueTag: ValueTag,
    constraints: RTCMediaConstraints): Promise<RTCSessionDescription> {
    return WebRTCModule.peerConnectionCreateOffer(valueTag, constraints.toJSON());
  }

  static peerConnectionRemoveStream(valueTag: ValueTag, streamValueTag: ValueTag) {
    WebRTCModule.peerConnectionRemoveStream(streamValueTag, valueTag);
  }

  static peerConnectionSetConfiguration(valueTag: ValueTag,
    configuration: RTCConfiguration) {
    WebRTCModule.peerConnectionSetConfiguration(configuration.toJSON(), valueTag);
  }

  static peerConnectionSetLocalDescription(valueTag: ValueTag,
    sdp: RTCSessionDescription): Promise<void> {
    return WebRTCModule.peerConnectionSetLocalDescription(sdp.toJSON(), valueTag);
  }

  static peerConnectionSetRemoteDescription(valueTag: ValueTag, sdp: RTCSessionDescription): Promise<void> {
    return WebRTCModule.peerConnectionSetRemoteDescription(sdp.toJSON(), valueTag);
  }

  static trackSetEnabled(valueTag: ValueTag, streamValueTag: ValueTag, enabled: boolean) {
    WebRTCModule.trackSetEnabled(enabled, valueTag, streamValueTag);
  }

}