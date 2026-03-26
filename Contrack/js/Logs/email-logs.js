const apiUrl = domain + '/TableDisplay/EmailLogs';
const element = document.querySelector('#TableEmailLogs');

const dataTableOptions = {
    apiEndpoint: apiUrl,
    pageSize: 20,
    columns: {
        EmailTitle: {
            title: 'Subject',
            render: (data, row) => {
                var fullTitle = row.EmailTitle;
                if (fullTitle == "" || fullTitle == null)
                    return "";
                else
                    return '<a href="/Logs/EmailLogsDetails/' + row.EmailLogUUID + '"' +
                        ' class="text-primary underline decoration-dashed decoration-primary"' +
                        ' data-tooltip="#tooltip_title_' + row.EmailLogUUID + '">' +
                        fullTitle +
                        '</a>' +
                        '<div class="tooltip" id="tooltip_title_' + row.EmailLogUUID + '">' +
                        '<div class="flex items-center gap-1">' +
                        fullTitle +
                        '<i class="ki-solid ki-information-5 text-lg text-warning"></i>' +
                        '</div>' +
                        '</div>';
            },
            createdCell: function (cell) {
                cell.classList.add('ellipsis', 'nowrap');
            }
        },
        EmailTo: {
            title: 'Recipient(s)',
            render: (data, row) => {
                var email = row.EmailTo;
                var emailcorrected = "";

                var emailList = email.split(";");

                if (emailList.length > 1) {
                    emailcorrected = emailList.slice(0, 1).join(";") + " <span class='text-primary'>+" + (emailList.length - 1) + "</span>";
                    return '<span data-tooltip="#advanced_tooltip_' + row.EmailLogUUID + '">' +
                        emailcorrected +
                        '</span>' +
                        '<div class="tooltip" id="advanced_tooltip_' + row.EmailLogUUID + '">' +
                        '<div class="flex items-center gap-1">' +
                        email +
                        '<i class="ki-solid ki-information-5 text-lg text-warning">' +
                        '</i>' +
                        '</div>' +
                        '</div>';
                } else {
                    emailcorrected = emailList.join(";");
                    return email;
                }

            },
        },
        CreatedAt: {
            title: 'Sent At',
            render: (data, row) => {
                return `<div class="flex items-center gap-2.5">
                        <div class="flex flex-col gap-0.5">
                            <span class="flex items-center gap-1.5 leading-none font-medium text-sm text-gray-900">
                                ` + row.CreatedAtFormatted + `
                                      </span>
                            <span class="text-center1 text-2sm text-gray-600 font-normal">
                                ` + row.TimeAgo + `
                            </span>
                        </div>
                    </div>`;
            },
            createdCell(cell) {
                cell.classList.add('nowrap');
            },
        },
        Status: {
            title: 'Status',
            sortable: true,
            render: function (data, row) {
                var text = "Unknown";
                var cssClass = "badge-secondary";

                switch (row.Status) {
                    case 1: text = "Pending"; cssClass = "badge-warning"; break;
                    case 2: text = "Sent"; cssClass = "badge-primary"; break;
                    case 3: text = "Failed"; cssClass = "badge-danger"; break;
                }

                return '<span class="badge py-1 badge-fixed ' + cssClass + ' badge-outline">' + text + '</span>';
            },
            createdCell: function (cell) {
                cell.classList.add('text-center');
                cell.classList.add('nowrap');
            }
        },
    },
};
const dataTable = new KTDataTable(element, dataTableOptions);