// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'stop_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

StopParams _$StopParamsFromJson(Map<String, dynamic> json) => StopParams(
      id: json['id'] as int?,
      usehelth: json['usehelth'] as int?,
      startday: json['startday'] as String?,
      endday: json['endday'] as String?,
      count: json['count'] as int?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$StopParamsToJson(StopParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'usehelth': instance.usehelth,
      'startday': instance.startday,
      'endday': instance.endday,
      'count': instance.count,
      'date': instance.date,
    };
