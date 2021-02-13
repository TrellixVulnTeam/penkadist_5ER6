import {Component, OnInit} from '@angular/core';
import {SingleMatchesService} from '../../../services/singleMatches/single-matches.service';
import {FormatService} from '../../../services/format/format.service';
import {GambleService} from '../../../services/gamble/gamble.service';
import {CompetitionService} from '../../../services/competition/competition.service';
import {MatchesService} from '../../../services/matches.service';

@Component({
    selector: 'app-single-matches-done',
    templateUrl: './single-matches-done.component.html',
    styleUrls: ['./single-matches-done.component.css']
})
export class SingleMatchesDoneComponent implements OnInit {

    datepicker = '';
    term: string;
    matches$ = this.matchesService.matches;
    competitions$ = this.competitionService.competitions;

    constructor(
        private singleMatchesService: SingleMatchesService,
        private formatService: FormatService,
        private gambleService: GambleService,
        private competitionService: CompetitionService,
        private matchesService: MatchesService) {
    }

    ngOnInit(): void {
    }

}
