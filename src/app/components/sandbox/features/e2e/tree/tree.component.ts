import { Component, ElementRef, OnInit, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TreeGraph } from '@shared/tree.view';
import { Label, MOCK_TREE_DATA, RestSessionTree } from '@shared/constants';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  readonly Label = Label;

  @ViewChild('graphContainer', { static: true }) graphContainer!: ElementRef;
  @ViewChild('outlineContainer', { static: true }) outlineContainer!: ElementRef;

  isLoading = false;
  TreeObj: RestSessionTree = MOCK_TREE_DATA;
  tree: any;

  minimapVisible = true;
  isFullscreen = false;
  searchVisible = false;
  searchQuery = '';
  searchResults: any[] = [];
  currentSearchIndex = 0;

  selectedCell: any = null;
  detailPanelVisible = false;
  expandedDetailRows = false;
  readonly MAX_VISIBLE_ROWS = 4;

  ViewForm = new FormGroup({
    nodeView: new FormControl<Label>(Label.SERVER_IDENTITY),
    linkView: new FormControl<Label>(Label.ELAPSED_LATENSE)
  });

  constructor(private _zone: NgZone, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.renderGraph();
    this.ViewForm.valueChanges.subscribe(() => {
      this.refreshLabels();
    });
  }

  renderGraph(): void {
    this.tree = TreeGraph.setup(this.graphContainer.nativeElement, (tg: any) => {
      tg.draw(this.TreeObj, this.ViewForm.value.nodeView, this.ViewForm.value.linkView);
      return tg;
    });

    if (this.outlineContainer?.nativeElement) {
      this.tree.setOutline(this.outlineContainer.nativeElement);
    }
    this.registerMouseEvents();
  }

  refreshLabels(): void {
    if (!this.tree) return;
    this.tree.redraw(this.TreeObj, this.ViewForm.value.nodeView, this.ViewForm.value.linkView);
  }

  registerMouseEvents(): void {
    const graph = this.tree._graph;
    graph.addMouseListener({
      mouseDown: () => {},
      mouseMove: (_s: any, me: any) => {
        const cell = me.getCell();
        this._zone.run(() => {
          if (cell) {
            this.selectedCell = cell;
            this.detailPanelVisible = true;
          } else {
            this.detailPanelVisible = false;
            this.selectedCell = null;
          }
        });
      },
      mouseUp: () => {}
    });
  }

  toggleMinimap(): void {
    this.minimapVisible = !this.minimapVisible;
  }

  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
  }

  toggleSearch(): void {
    this.searchVisible = !this.searchVisible;
  }

  closeDetailPanel(): void {
    this.detailPanelVisible = false;
    this.selectedCell = null;
  }

  getCellDetails(): any {
    if (!this.selectedCell) return { type: '', name: '', rows: [] };
    const val = this.selectedCell.value;
    return {
      type: val?.requestType || 'Serveur',
      name: val?.node?.nodeObject?.appName || 'Node',
      rows: val?.node?.nodeInfo?.() || []
    };
  }
}

