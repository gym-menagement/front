// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'usehelth_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UsehelthModel _$UsehelthModelFromJson(Map<String, dynamic> json) =>
    UsehelthModel(
      id: json['id'] as int,
      order: json['order'] as int,
      helth: json['helth'] as int,
      user: json['user'] as int,
      rocker: json['rocker'] as int,
      term: json['term'] as int,
      discount: json['discount'] as int,
      startday: json['startday'] as String,
      endday: json['endday'] as String,
      date: json['date'] as String,
    );

Map<String, dynamic> _$UsehelthModelToJson(UsehelthModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'order': instance.order,
      'helth': instance.helth,
      'user': instance.user,
      'rocker': instance.rocker,
      'term': instance.term,
      'discount': instance.discount,
      'startday': instance.startday,
      'endday': instance.endday,
      'date': instance.date,
    };
