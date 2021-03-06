import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PackageDetailPage } from '../package-detail/package-detail';

import { Item } from '../../models/item';

import { Package } from '../../models/package';
import { Packages } from "../../providers/packages";


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public search: Array<Package> = new Array<Package>();
  public packages: Array<Package> = new Array<Package>();


  constructor(public navCtrl: NavController, public navParams: NavParams, public pack: Packages, http: Http) {
    this.getInstalledPackages();
  }

  public getInstalledPackages() {
    this.pack.getAll().subscribe((data) => this.packages = data);
  }

  public getPackages(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.search = new Array<Package>();
      return;
    }
    this.pack.searchNpm(val).subscribe((data) => {
      this.search.length = 0;
      data.forEach((element) => {
        this.packages.forEach((pack) => {
          if (element.name === pack.name) {
            const atualizado = pack.version === element.version;
            element['color'] = atualizado ? 'blue' : 'red';
            element['myVersion'] = pack.version;
          }
        });
        this.search.push(element);
      })
    });
  }

  public packageDetail(pack: Package) {
    this.navCtrl.push(PackageDetailPage, { pack: pack });
  }


  public installPackage(pack: Package) {
    this.pack.add({ name: pack.name, version: pack.version }).subscribe(() => this.getInstalledPackages());
  }
}
