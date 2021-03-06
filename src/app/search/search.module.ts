import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';
import { SearchRoutingModule } from './search-routing.module';
import { SearchPopoverComponent } from './search-popover';
import { SearchComponent } from './search.component';

const DECLARATIONS = [SearchComponent, SearchPopoverComponent];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    SearchRoutingModule
  ],
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS],
  providers: []
})
export class SearchModule {}
