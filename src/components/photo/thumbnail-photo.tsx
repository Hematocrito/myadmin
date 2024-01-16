import { PureComponent } from 'react';
import { Image } from 'antd';
import { IPhotoUpdate } from 'src/interfaces';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  photo?: IPhotoUpdate;
  // eslint-disable-next-line react/require-default-props
  style?: Record<string, string>;
}

export class ThumbnailPhoto extends PureComponent<IProps> {
  render() {
    const { style, photo } = this.props;
    const { photo: item } = photo;
    const urlThumb = (item?.url) || '/placeholder-img.jpg';
    return <Image preview={false} src={urlThumb} style={style || { width: 50 }} />;
  }
}
