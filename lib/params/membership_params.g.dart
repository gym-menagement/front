// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'membership_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

MembershipParams _$MembershipParamsFromJson(Map<String, dynamic> json) =>
    MembershipParams(
      id: json['id'] as int?,
      gym: json['gym'] as int?,
      user: json['user'] as int?,
      name: json['name'] as String?,
      sex: json['sex'] as int?,
      birth: json['birth'] as String?,
      phonenum: json['phonenum'] as String?,
      address: json['address'] as String?,
      image: json['image'] as String?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$MembershipParamsToJson(MembershipParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'user': instance.user,
      'name': instance.name,
      'sex': instance.sex,
      'birth': instance.birth,
      'phonenum': instance.phonenum,
      'address': instance.address,
      'image': instance.image,
      'date': instance.date,
    };
