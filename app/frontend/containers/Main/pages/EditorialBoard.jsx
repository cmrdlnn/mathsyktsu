import React, { Fragment } from 'react';

function EditorialBoard() {
  return (
    <Fragment>
      <img className="title" src="/images/title.png" alt="О журнале" />
      <p className="caption">
        Редколлегия
      </p>
      <div className="main-description">
        <ul>
          <li>Ермоленко А.В., к.ф.-м.н., доцент - главный редактор,</li>
          <li>Беляева Н.А., д.ф.-м.н., профессор (СГУ им. Питирима Сорокина),</li>
          <li>Вечтомов Е.М., д.ф.-м.н., профессор (ВятГУ),</li>
          <li>Головач П.А., к.ф.-м.н., доцент (Универитет Бергена, Норвегия),</li>
          <li>Калинин С.И., д.п.н., к.ф.-м.н., профессор (ВятГУ),</li>
          <li>Колпак Е.П., д.ф.-м.н., профессор (СПбГУ),</li>
          <li>Котов Л.Н., д.ф.-м.н., профессор (СГУ им. Питирима Сорокина),</li>
          <li>Малоземов В.Н., д.ф.-м.н., профессор (СПбГУ),</li>
          <li>Одинец В.П., д.ф.-м.н., профессор (СГУ им. Питирима Сорокина),</li>
          <li>Певный А.Б., д.ф.-м.н., профессор (СГУ им. Питирима Сорокина),</li>
          <li>Петров Н.Н., д.ф.-м.н., профессор (УдмГУ),</li>
          <li>Петраков А.П., д.ф.-м.н., профессор (СГУ им. Питирима Сорокина),</li>
          <li>Котелина Н.О., к.ф.-м.н., доцент (СГУ им. Питирима Сорокина),</li>
          <li>Хозяинов С.А., к.филол.н., доцент (СГУ им. Питирима Сорокина),</li>
          <li>Чермных В.В., д.п.н., к.ф.-м.н., профессор (ВятГУ),</li>
          <li>Юркина М.Н. (техн.секретарь, СГУ им. Питирима Сорокина),</li>
          <li>Гудырева Л.В. (техн. редактор, СГУ им. Питирима Сорокина).</li>
        </ul>
        <div className="description-title">
          Примечание
          <p>Мнение редакционной коллегии может не совпадать с мнением авторов (в том числе и опубликованной) статьи.</p>
        </div>
      </div>
    </Fragment>
  );
}

export default EditorialBoard;
