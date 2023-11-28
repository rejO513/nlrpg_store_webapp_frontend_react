import { Table } from 'semantic-ui-react';

export function ViewUserStatus({label, value}){
    return (
        <Table.Row>
            {/* ユーザーステータス閲覧用 テーブル1行分 */}
            <Table.Cell><b>{label}</b></Table.Cell>
            <Table.Cell>{value}</Table.Cell>
        </Table.Row>
    );
}
