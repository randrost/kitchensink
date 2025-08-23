import {
  Component, inject,
  OnInit, signal,
  WritableSignal
} from '@angular/core';
import {
  CompactType, DisplayGrid,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridType
} from 'angular-gridster2';
import {MatIconModule} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import * as uuid from 'uuid';
import {MatRippleModule} from '@angular/material/core';
import {PanelBodyComponent, PanelComponent, PanelHeaderComponent} from '@elementar-ui/components/panel';
import {SidePanelComponent, SidePanelTabComponent} from '@elementar-ui/components/side-panel';
import {Snackbar} from '@core/services/snackbar';

@Component({
  selector: 'app-widget-grid',
  imports: [
    GridsterComponent,
    GridsterItemComponent,
    MatIconModule,
    MatButton,
    MatRippleModule,
    PanelComponent,
    PanelBodyComponent,
    PanelHeaderComponent,
    SidePanelComponent,
    SidePanelTabComponent,
    MatIconButton,
  ],
  templateUrl: './widget-grid.html',
  styleUrl: './widget-grid.scss',
})
export class WidgetGrid implements OnInit {
  private _snackbarService = inject(Snackbar);

  options: GridsterConfig = {
    gridType: GridType.Fit,
    compactType: CompactType.None,

    margin: 6,

    outerMargin: true,
    outerMarginTop: 6,
    outerMarginRight: 6,
    outerMarginBottom: 6,
    outerMarginLeft: 6,

    useTransformPositioning: true,
    mobileBreakpoint: 640,
    useBodyForBreakpoint: false,

    minCols: 1,
    maxCols: undefined,
    minRows: 1,
    maxRows: undefined,
    maxItemCols: undefined,
    minItemCols: 1,
    maxItemRows: undefined,
    minItemRows: 1,
    maxItemArea: 2500,
    minItemArea: 1,
    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedColWidth: 105,
    fixedRowHeight: 105,
    keepFixedHeightInMobile: false,
    keepFixedWidthInMobile: false,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    enableEmptyCellClick: false,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    enableOccupiedCellDrop: false,
    emptyCellDragMaxCols: 50,
    emptyCellDragMaxRows: 50,
    ignoreMarginInRow: false,
    draggable: {
      enabled: true
    },
    resizable: {
      enabled: true
    },
    swap: false,
    pushItems: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: {north: true, east: true, south: true, west: true},
    pushResizeItems: false,
    displayGrid: DisplayGrid.None,
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false,
  };
  dashboard: WritableSignal<Array<GridsterItem>> = signal([]);

  ngOnInit(): void {
    //load initial data
  }

  addItem(): void {
    this.dashboard.update(dashboard => [...dashboard, {
      cols: 1, rows: 1, y: 0, x: 0, id: uuid.v7(),
      title: 'New Widget',
    }]);
  }

  removeItem(item: GridsterItem): void {
    this.dashboard.update(dashboard => dashboard.filter(d => d !== item));
    this._snackbarService.openSnackBar('Widget removed');
  }

  lol(): void {
    if (this.options.api?.optionsChanged)
    this.options.api.optionsChanged()
  }
}
