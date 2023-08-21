
import {Dayjs} from 'dayjs'

export default interface ICampaign {
    advertiser_id: string;
    begin_date: Dayjs;
    budget_max: string;
    business_activity_ids: string[];
    business_type_ids: string[];
    display_hours: string;
    end_date: Dayjs;
    file: any;
    location_ids: string[];
    name: string;
    status: string;
    url: string;
}