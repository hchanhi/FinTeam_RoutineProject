-- 유저
insert into roles(name) values('ROLE_USER');
insert into roles(name) values('ROLE_ADMIN');

insert into users(email, created_date, modified_date, nickname, password) values("aaaa@aaaa.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "같공", "$2a$10$.mkPounQ.21xk7YLmY7me.A8QmLtx1lfdv.l1b3OfUNfI27.QU0YW");
insert into users(email, created_date, modified_date, nickname, password) values("hanchan200@naver.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "찬찬", "$2a$10$.mkPounQ.21xk7YLmY7me.A8QmLtx1lfdv.l1b3OfUNfI27.QU0YW");
insert into users(email, created_date, modified_date, nickname, password) values("alsgurdl1993@naver.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "민민", "$2a$10$.mkPounQ.21xk7YLmY7me.A8QmLtx1lfdv.l1b3OfUNfI27.QU0YW");
insert into users(email, created_date, modified_date, nickname, password) values("bbbb@bbbb.com", "2022-05-25 00:00:00", "2022-05-25 00:00:00", "hah", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");
insert into users(email, created_date, modified_date, nickname, password) values("cccc@cccc.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "진진", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");
insert into users(email, created_date, modified_date, nickname, password) values("dddd@dddd.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "신주", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");
insert into users(email, created_date, modified_date, nickname, password) values("eeee@eeee.com", "2022-06-01 00:00:00", "2022-06-01 00:00:00", "구주", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");

-- 뱃지
insert into achievements (id, title, description, needs_count) values (1, 'pillgood', '첫 로그인', 0);
insert into achievements (id, title, description, needs_count) values (2, 'supplements_count', '영양제 1개 등록', 1);
insert into achievements (id, title, description, needs_count) values (3, 'max_continuity', '연속일수 3일', 3);