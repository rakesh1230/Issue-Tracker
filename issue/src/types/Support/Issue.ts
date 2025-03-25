
export interface Issue{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Series : Select	*/
	naming_series?: "ISS-.YYYY.-"
	/**	Subject : Data	*/
	subject: string
	/**	Customer : Link - Customer	*/
	customer?: string
	/**	Raised By (Email) : Data	*/
	raised_by?: string
	/**	Status : Select	*/
	status?: "Open" | "Replied" | "On Hold" | "Resolved" | "Closed"
	/**	Priority : Link - Issue Priority	*/
	priority?: string
	/**	Issue Type : Link - Issue Type	*/
	issue_type?: string
	/**	Issue Split From : Link - Issue	*/
	issue_split_from?: string
	/**	Description : Text Editor	*/
	description?: string
	/**	Service Level Agreement : Link - Service Level Agreement	*/
	service_level_agreement?: string
	/**	Response By : Datetime	*/
	response_by?: string
	/**	Service Level Agreement Status : Select	*/
	agreement_status?: "First Response Due" | "Resolution Due" | "Fulfilled" | "Failed"
	/**	Resolution By : Datetime	*/
	resolution_by?: string
	/**	Service Level Agreement Creation : Datetime	*/
	service_level_agreement_creation?: string
	/**	On Hold Since : Datetime	*/
	on_hold_since?: string
	/**	Total Hold Time : Duration	*/
	total_hold_time?: string
	/**	First Response Time : Duration	*/
	first_response_time?: string
	/**	First Responded On : Datetime	*/
	first_responded_on?: string
	/**	Average Response Time : Duration	*/
	avg_response_time?: string
	/**	Resolution Details : Text Editor	*/
	resolution_details?: string
	/**	Opening Date : Date	*/
	opening_date?: string
	/**	Opening Time : Time	*/
	opening_time?: string
	/**	Resolution Date : Datetime	*/
	resolution_date?: string
	/**	Resolution Time : Duration	*/
	resolution_time?: string
	/**	User Resolution Time : Duration	*/
	user_resolution_time?: string
	/**	Lead : Link - Lead	*/
	lead?: string
	/**	Contact : Link - Contact	*/
	contact?: string
	/**	Email Account : Link - Email Account	*/
	email_account?: string
	/**	Customer Name : Data	*/
	customer_name?: string
	/**	Project : Link - Project	*/
	project?: string
	/**	Company : Link - Company	*/
	company?: string
	/**	Via Customer Portal : Check	*/
	via_customer_portal?: 0 | 1
	/**	Attachment : Attach	*/
	attachment?: string
	/**	Content Type : Data	*/
	content_type?: string
}