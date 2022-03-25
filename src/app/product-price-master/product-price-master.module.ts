import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPriceMasterRoutingModule } from './product-price-master-routing.module';
import { ProductPriceMasterListComponent } from './product-price-master-list/product-price-master-list.component';
import { ProductPriceMasterBreadComponent } from './product-price-master-bread/product-price-master-bread.component';

import { NgxEditorModule} from 'ngx-editor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductPriceMasterListComponent,
    ProductPriceMasterBreadComponent
  ],
  imports: [
    CommonModule,
    ProductPriceMasterRoutingModule,
    FormsModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    })
  ]
})
export class ProductPriceMasterModule { }
