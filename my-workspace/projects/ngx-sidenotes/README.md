# ngx-sidenotes

## Goals

- Place notes/comments to the side of one or more documents with inline references.
- When an inline reference is clicked, animate the relevant sidenote to be as close as possible and move non-relevant sidenotes out of the way without overlapping.
- Do not provide UI or impose any styling, **only placement**.


## Use cases

- Comment streams next to a document. This is showing [Curvenote](https://curvenote.com), which is a scientific writing platform that connects to Jupyter.


## Choices

- Use Angular, Redux
- Used Redux rather than a hook approach (open to discussion if people are passionate!)


## Constraints

- Multiple documents on the page, currently based on the wrapping `<article>` ID
- Multiple inline references per sidenote, wrapped in `<lib-ngx-sidenotes-anchor>`; `lib-ngx-sidenotes-anchor` is a `span`
- Have fallback placements to a `<lib-ngx-sidenotes-anchor-base>`; `lib-ngx-sidenotes-anchor-base` is a `div`
- Provide actions to attach non-react bases, anchors or reposition sidenotes
- All positioning is based on the article, and works with `relative`, `fixed` or `absolute` positioning.


## Getting Started:

```
npm i ngx-sidenotes
```


## Angular Setup:

in tsconfig.json > compilerOptions > paths:
```
...
"@angular/*": [
  "./node_modules/@angular/*"
],
"@ngrx/*": [
  "./node_modules/@ngrx/*"
]
```


in module (for example, app.module.ts):
```
import {NgxSidenotesModule} from 'ngx-sidenotes';

@NgModule({
  imports: [
    ...
    NgxSidenotesModule,
  ],
  exports: [
    ...
    NgxSidenotesModule,
  ],
})
```

in component (for example, app.component.ts)
```
import {NgxSidenotesService} from 'ngx-sidenotes';
...
export class AppComponent {
  constructor(
    ...
    private sidenoteService: NgxSidenotesService
  ) {}
  deselectSidenote(docId: string): void {
    this.sidenoteService.deselectSidenote(docId);
  }
```

in component template (for example, app.component.html)
```
<button (click)="deselectSidenote('article-main')">Deselect Sidenote</button>
<article id="article-main">
  <lib-ngx-sidenotes-anchor-base [anchor]="'anchor'">
    <div class="main-text">
      <p><lib-ngx-sidenotes-anchor [sidenoteId]="'blue'" class="blue">'Lorem Ipsum</lib-ngx-sidenotes-anchor>
        - это <lib-ngx-sidenotes-anchor [sidenoteId]="'red'" class="red">текст</lib-ngx-sidenotes-anchor>-"рыба", часто используемый в печати и вэб-дизайне.',</p>
      <p>'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',</p>
      <p>'Lorem <lib-ngx-sidenotes-anchor [sidenoteId]="'red'" class="red">Ipsum</lib-ngx-sidenotes-anchor>
        - это <lib-ngx-sidenotes-anchor [sidenoteId]="'red'" class="red">текст</lib-ngx-sidenotes-anchor>
        -"рыба", часто используемый в печати и вэб-дизайне.',</p>
      <p>'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',</p>
      <p>'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',</p>
      <p><lib-ngx-sidenotes-anchor [sidenoteId]="'blue'" class="blue">
        'Lorem Ipsum - это текст-"рыба",</lib-ngx-sidenotes-anchor> часто используемый в печати и вэб-дизайне.',</p>
      <p>'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',</p>
      <p>'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',</p>
      <p>'Lorem Ipsum - это текст-"рыба", часто используемый в
        <lib-ngx-sidenotes-anchor [sidenoteId]="'blue'" class="blue">печати и</lib-ngx-sidenotes-anchor>
        вэб-дизайне.',</p>
      <p>'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',</p>
      <p>'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',</p>
      <p>'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',</p>
      <p>'Lorem Ipsum - <lib-ngx-sidenotes-anchor [sidenoteId]="'red'" class="red">
        это</lib-ngx-sidenotes-anchor> текст-"рыба", часто используемый в печати и вэб-дизайне.',</p>
    </div>
  </lib-ngx-sidenotes-anchor-base>

  <div class="sidenotes">
    <lib-ngx-sidenotes-block-item [sidenoteId]="'blue'" [base]="'anchor'">
      <div [style.background-color]="'blue'"></div>
    </lib-ngx-sidenotes-block-item>
    <lib-ngx-sidenotes-block-item [sidenoteId]="'red'" [base]="'anchor'">
      <div [style.background-color]="'red'"></div>
    </lib-ngx-sidenotes-block-item>
    <lib-ngx-sidenotes-block-item [sidenoteId]="'green'" [base]="'anchor'">
      <div [style.background-color]="'green'">Some text</div>
    </lib-ngx-sidenotes-block-item>
  </div>
</article>
```

some styles, if you need (app.component.css)
```
article {
  position: relative;
}
.sidenotes {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
}
```


