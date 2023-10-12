import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdUnitConstant } from 'src/app/shared/constants/ad-unit-constant';
import { Observable } from 'rxjs';
import { TimestampDate } from 'timestamp-date';

export interface AdMetricsItem {
  id: string;
  cpm: number;
  domain: string;
  impressions: number;
  matched_requests: number;
  revenue: number;
  metric: number;
  site_id: number;
  total_requests: number;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BackofficeAdNetworkService {
  adnetworksCollections = 'adnetworks';
  sitesSubCollection = 'sites';
  adUnitsSubCollection = 'units';
  statsSubCollection = 'stats';

  private timestampDate = new TimestampDate();

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
  ) {
    // db.collection(this.adnetworksCollections).get().pipe(take(1)).subscribe(sn1 => {
    //   const pbs = sn1.docs.map(d => {
    //     return { ...d.data(), id: d.id };
    //   });

    //   pbs.forEach(pub => {
    //     const statsCol = `${this.adnetworksCollections}/${pub.id}/${this.statsSubCollection}`;

    //     db.collection(statsCol).get().pipe(take(1)).subscribe(sn2 => {
    //       const stats = sn2.docs.map(d => {
    //         return { ...d.data(), id: d.id };
    //       });

    //       stats.forEach((stat: any) => {
    //         const metrics: any[] = stat.report.metrics;
    //         let hour = 24 * 60 * 60 * 1000;

    //         const newMetrics: AdMetricsItem[] = metrics.reverse().map((m, i) => {
    //           const date = (new Date(2020, 11, 16, 1).getTime()) - (i * hour);

    //           const mt: AdMetricsItem = {
    //             id: db.createId(),
    //             date: new Date(date),
    //             metric: parseInt(m.metric) || 0,
    //             cpm: parseFloat(m.cpm) || 0,
    //             revenue: parseFloat(m.revenue) || 0,
    //             matched_requests: parseInt(m.matched_requests) || 0,
    //             total_requests: parseInt(m.total_requests) || 0,
    //             site_id: m.site_id,
    //             impressions: parseFloat(m.impressions) || 0,
    //             domain: m.domain || ''
    //           };

    //           return mt;
    //         });

    //         newMetrics.forEach(m => {
    //           const col = `${statsCol}/${stat.id}/metrics`;

    //           db.collection(col).doc(m.id.toString()).set(m);
    //         });
    //       });
    //     });
    //   });
    // });
  }

  addNewSite(publisherId, siteData) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIDomain + `/api/v1/adnetworks/${publisherId}/sites`, siteData).subscribe((result) => {
        resolve(result)
      }, (error) => {
        reject(error)
      })
    })
  }

  updateSite(publisherId: string, siteId: string, siteData) {
    return new Promise((resolve, reject) => {
      return this.http.put(environment.baseAPIDomain + `/api/v1/adnetworks/${publisherId}/sites/${siteId}`, siteData).subscribe((siteData) => {
        resolve(siteData)
      }, (error) => {
        reject(error)
      })
    })
  }

  deleteSite(publisherId, siteId) {
    return this.http.delete(environment.baseAPIDomain + `/api/v1/adnetworks/${publisherId}/sites/${siteId}`);
  }

  getSitesByPublisher(publisherId, limit: number = 10, lastVisible = null) {
    let dataQuery = this.db.collection(this.adnetworksCollections).doc(publisherId).collection(`${this.sitesSubCollection}`, ref => ref.orderBy('created_at', 'desc'))
    return dataQuery.snapshotChanges().pipe(map(actions => {
      return {
        sites: actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }),
        lastVisible: actions && actions.length < limit ? null : actions[actions.length - 1].payload.doc
      }
    })
    );
  }

  public getSiteMetrics(pubId: string, itemId: string): Observable<AdMetricsItem[]> {
    const col = `${this.adnetworksCollections}/${pubId}/${this.statsSubCollection}/${itemId}/metrics`;

    return this.db.collection(col, ref => {
      return ref.orderBy('date', 'desc').limit(7);
    }).snapshotChanges().pipe(map(data => {
      return data.map(a => {
        const data: any = a.payload.doc.data();
        const id = a.payload.doc.id;
        return this.timestampDate.parseTimestampToDate({ id, ...data });
      });
    }));
  }

  getSiteById(siteId: string) {
    return this.db.collectionGroup(this.sitesSubCollection, ref => ref.where('id', '==', siteId)).snapshotChanges().pipe(map(data => {
      return data.map(a => {
        const data: any = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  addSiteAdUnit(publisherId: string, adUnitData) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIDomain + `/api/v1/adnetworks/${publisherId}/units`, adUnitData).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  updateSiteAdUnit(publisherId: string, adUnitId: string, adUnitData) {
    return new Promise((resolve, reject) => {
      return this.http.put(environment.baseAPIDomain + `/api/v1/adnetworks/${publisherId}/units/${adUnitId}`, adUnitData).subscribe((result) => {
        resolve(result)
      }, (error) => {
        reject(error)
      })
    })
  }

  deleteSiteAdUnit(publisherId, adUnitId) {
    return this.http.delete(environment.baseAPIDomain + `/api/v1/adnetworks/${publisherId}/units/${adUnitId}`);
  }

  public getSiteAdUnits(publisherId: string, siteId: string, limit: number = 10, lastVisible = null) {
    const col = `${this.adnetworksCollections}/${publisherId}/${this.adUnitsSubCollection}`;

    const dataQuery = this.db.collection(col, ref => ref.where('site_id', '==', siteId).orderBy('created_at', 'desc'));
    return dataQuery.snapshotChanges().pipe(map(actions => {
      return {
        siteAdUnits: actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }),
        lastVisible: actions && actions.length < limit ? null : actions[actions.length - 1].payload.doc
      };
    })
    );
  }

  getSiteAdUnitsForPublisher(publisherId, siteId, limit: number = 10, lastVisible = null) {
    const col = `${this.adnetworksCollections}/${publisherId}/${this.adUnitsSubCollection}`;

    const dataQuery = this.db.collection(col, ref =>
      ref.where('site_id', '==', siteId).where('status.title', '==', AdUnitConstant.ACTIVE.title).orderBy('created_at', 'desc'));

    return dataQuery.snapshotChanges().pipe(map(actions => {
      return {
        siteAdUnits: actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }),
        lastVisible: actions && actions.length < limit ? null : actions[actions.length - 1].payload.doc
      }
    })
    );
  }

  getSiteStats(publisherId, limit: number = 10, lastVisible = null) {
    let dataQuery = this.db.collection(this.adnetworksCollections)
      .doc(publisherId)
      .collection(`${this.statsSubCollection}`, ref =>
        ref.where('client_name', '==', 'mytrendingstories.com'));

    return dataQuery.snapshotChanges().pipe(map(actions => {
      return {
        siteAdUnits: actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }),
        lastVisible: actions && actions.length < limit ? null : actions[actions.length - 1].payload.doc
      }
    }));
  }
}
