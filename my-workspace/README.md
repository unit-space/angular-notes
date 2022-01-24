Наличие ngrx-store обязательно.

Подключение: npm i ngx-sidenotes
в модуле:
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

Если нужен сервис:
import {NgxSidenotesService} from 'ngx-sidenotes';
в сервисе метод deselectSidenote, в него нужно передать article id

Структура шаблона:

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

Возможно, понадобятся некоторые стили:
article {
position: relative;
}
.sidenotes {
position: absolute;
top: 0;
right: 0;
width: 300px;
}
