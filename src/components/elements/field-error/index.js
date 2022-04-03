/**
 * Вывод ошибки из общего массива ошибок
 * У каждой ошибки ожидайется ключ, соответсвующий пути на свойство модели, например "profile.name"
 * Компонент выводит ошибку, если по указанному ключу есть ошибка в общем массиве ошибок
 */
import React, { Component } from 'react';
import classes from './field-error.module.scss';

export default class FieldError extends Component {
  renderItems() {
    const path = this.props.path;
    const errors = this.props.errors;
    if (!errors && !(errors instanceof Array) && !(errors instanceof Object)) {
      return null;
    }

    const items = [];
    this.getErrors(items, errors, path);
    return items;
  }

  getErrors(items, errors, path) {
    if (path instanceof Array && path.length === 1) {
      path = path[0];
    }
    Object.entries(errors).map(([errorPath, messagesOrMessage]) => {
      let messages = [];
      if (!(messagesOrMessage instanceof Array)) {
        messages = [messagesOrMessage];
      } else {
        messages = messagesOrMessage;
      }

      if (path instanceof Array && this.isCurrentPath(errorPath, path[0])) {
        return this.getErrors(items, messagesOrMessage, path.splice(1, 1));
      }

      messages.map((message, index) => {
        if (!message) {
          return;
        }
        if (this.isCurrentPath(errorPath, path)) {
          items.push(
            <div key={errorPath + index} className="FieldError__item">
              {message}
            </div>
          );
        }
      });
    });
  }

  isCurrentPath(errorPath, path) {
    return (
      (errorPath && errorPath.indexOf(path) === 0 && path.length > 0) ||
      (errorPath.length === 0 && path.length === 0) ||
      (!errorPath && !path)
    );
  }

  render() {
    return (
      <div className={classes.FieldError}>
        {this.props.childError && <div className={classes.FieldError__item}>{this.props.children}</div>}
        {this.renderItems()}
      </div>
    );
  }
}
