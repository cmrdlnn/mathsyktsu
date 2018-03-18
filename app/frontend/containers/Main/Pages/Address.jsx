import React from 'react'

function Address() {
  return (
    <div className="main-content">
      <img className="title" src="/images/title.png" alt="О журнале" />
      <p className="caption">
        Адрес редакции
      </p>
      <div className="main-description">
        <p className="main-description-title">АДРЕС</p>
        167001, г. Сыктывкар, Октябрьский просп., 55
        <br />
        ФГБОУ ВО «СГУ им.Питирима Сорокина», кафедра прикладной математики и информационных технологий в образовании
        <br />
        Вестник Сыктывкарского университета. Серия 1: Математика. Механика. Информатика.
        <p className="main-description-title">ЭЛЕКТРОННАЯ ПОЧТА</p>
        <a href="mailto:vestnik-mmi@syktsu.ru">vestnik-mmi@syktsu.ru</a>
      </div>
    </div>
  )
}

export default Address