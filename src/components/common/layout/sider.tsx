/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
// @ts-nocheck
// @ts-ignore
/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import { Layout, Switch } from 'antd';
import Link from 'next/link';
import { getGlobalConfig } from 'src/services';
import ScrollBar from '../base/scroll-bar';
import { SiderMenu } from './menu';
// import './sider.less';

interface ISiderProps {
  collapsed?: boolean;
  theme?: string;
  isMobile?: boolean;
  logo?: string;
  siteName?: string;
  onThemeChange?: Function
  menus?: any;
}

const Scroll: any = ScrollBar;

class Sider extends PureComponent<ISiderProps> {
  render() {
    const {
      collapsed, theme, isMobile, logo, siteName, onThemeChange, menus
    } = this.props;
    return (
      <Layout.Sider
        width={256}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="slider"
      >
        <div className="brand">
          <div className="logo">
            <Link legacyBehavior href="/">
              <img alt="logo" src="/img/logo-trans.png" style={{ height: 45 }} />
            </Link>
          </div>
        </div>

        <div className="menuContainer">
          <Scroll
            options={{
              // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
              suppressScrollX: true
            }}
          >
            <SiderMenu
              menus={menus}
              theme={theme}
              isMobile={isMobile}
            />
          </Scroll>
        </div>
        {!collapsed && (
          <div className="switchTheme">
            <span>
              <span>
                v
                {getGlobalConfig().NEXT_PUBLIC_BUILD_VERSION}
              </span>
            </span>
            <Switch
              onChange={onThemeChange && onThemeChange.bind(
                this,
                theme === 'dark' ? 'light' : 'dark'
              )}
              defaultChecked={theme === 'dark'}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </div>
        )}
      </Layout.Sider>
    );
  }
}

export default Sider;
