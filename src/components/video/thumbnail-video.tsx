import { PureComponent } from 'react';
import { IVideo } from 'src/interfaces';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  video?: IVideo;
  // eslint-disable-next-line react/require-default-props
  style?: Record<string, string>;
}

export class ThumbnailVideo extends PureComponent<IProps> {
  render() {
    const { video, style } = this.props;
    const { thumbnail } = video;
    const url = (thumbnail?.url) || '/video.png';
    return <img alt="" src={url} style={style || { width: 50 }} />;
  }
}
