import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import RSVP from 'rsvp';
import Ember from 'ember';

export default class SearchComponent extends Component {
  @service store;
  entity;
  options;
  //options = this.store.peekAll('rental'); //works
 /* 
  options = [
    { groupName: 'Rental', options: this.store.peekAll('rental') }
  ];
  */
  
  options = this.fetchOptions();

  @action
  fetchOptions() {
    
    var rentalOptions = this.store.peekAll('rental');

    let groups = Ember.RSVP.all([rentalOptions]).then(([rentals]) => {
      return [
        {
          groupName: "Rentals",
          options: rentals
        }
      ];
    });

    return groups;

  }

  @action
  renderSelection(thing) {
    this.set('entity', thing);
  }
}
