import 'package:json_annotation/json_annotation.dart';

part 'user_params.g.dart';

@JsonSerializable()
class UserParams {
  
  final int? id;
  final int? gym;
  final String? loginid;
  final String? passwd;
  final String? name;
  final int? role;
  final String? image;
  final int? sex;
  final String? birth;
  final String? phonenum;
  final String? address;
  final String? startday;
  final String? endday;
  final String? date;

  const UserParams({
    
    this.id,
    this.gym,
    this.loginid,
    this.passwd,
    this.name,
    this.role,
    this.image,
    this.sex,
    this.birth,
    this.phonenum,
    this.address,
    this.startday,
    this.endday,
    this.date,
  });

  factory UserParams.fromJson(Map<String, dynamic> json) =>
      _$UserParamsFromJson(json);

  Map<String, dynamic> toJson() => _$UserParamsToJson(this);
}
