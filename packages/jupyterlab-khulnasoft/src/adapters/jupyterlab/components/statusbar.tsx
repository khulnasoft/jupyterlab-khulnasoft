// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// Based on the @jupyterlab/codemirror-extension statusbar

import React from 'react';
import { extname } from 'path';

import { VDomRenderer } from '@jupyterlab/apputils';
import { GroupItem, item, TextItem } from '@jupyterlab/statusbar';

import { KhulnasoftStatusModel } from './status_model';

import '../../../../style/statusbar.css';

/**
 * StatusBar item.
 */
export class KhulnasoftStatus extends VDomRenderer<KhulnasoftStatusModel> {
  /**
   * Construct a new VDomRenderer for the status item.
   */
  constructor(model: KhulnasoftStatusModel) {
    super(model);
    model.refresh().catch(e => console.log(e));
    this.addClass(item);
    this.addClass('khulnasoft-statusbar-item');
    this.title.caption = 'Khulnasoft Status';
  }

  /**
   * Render the status item.
   */
  render() {
    if (
      !this.model ||
      !this.model.adapter ||
      // Other properties, such as adapter.language are not reliable when the server extension is not reachable
      !this.isSupportedDocumentPath(this.model.adapter.document_path)
    ) {
      this.setHidden(true);
      return null;
    }

    this.setHidden(false);

    const props: React.HTMLAttributes<HTMLDivElement> = {};
    if (this.model.reloadRequired) {
      props.style = { cursor: 'pointer' };
      props.onClick = () => window.location.reload();
    }

    return (
      <GroupItem {...props} spacing={4} title={this.model.message.tooltip}>
        <this.model.icon.react top={'2px'} kind={'statusBar'} />
        <TextItem source={this.model.message.text} />
      </GroupItem>
    );
  }

  isSupportedDocumentPath(path: string) {
    return extname(path) === '.py' || extname(path) === '.ipynb';
  }
}
